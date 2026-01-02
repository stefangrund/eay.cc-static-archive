import camelcase from 'camelcase';
import { Command } from 'commander';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import process from 'process';

// all user options for command line and wizard are declard here
const options = [
  // wizard must always be first
  {
    name: 'wizard',
    type: 'boolean',
    description: 'Use wizard',
    default: true
  },
  {
    name: 'input',
    type: 'file',
    description: 'Path to WordPress export file',
    default: 'export.xml'
  },
  {
    name: 'output',
    type: 'folder',
    description: 'Path to output folder',
    default: 'output'
  },
  {
    name: 'year-folders',
    aliases: ['yearfolders', 'yearmonthfolders'],
    type: 'boolean',
    description: 'Create year folders',
    default: false
  },
  {
    name: 'month-folders',
    aliases: ['yearmonthfolders'],
    type: 'boolean',
    description: 'Create month folders',
    default: false
  },
  {
    name: 'post-folders',
    aliases: ['postfolders'],
    type: 'boolean',
    description: 'Create a folder for each post',
    default: true
  },
  {
    name: 'prefix-date',
    aliases: ['prefixdate'],
    type: 'boolean',
    description: 'Prefix post folders/files with date',
    default: false
  },
  {
    name: 'save-attached-images',
    aliases: ['saveimages'],
    type: 'boolean',
    description: 'Save images attached to posts',
    default: true
  },
  {
    name: 'save-scraped-images',
    aliases: ['addcontentimages'],
    type: 'boolean',
    description: 'Save images scraped from post body content',
    default: true
  },
  {
    name: 'ignore-meta-keys',
    aliases: ['ignoremetakeys'],
    type: 'string',
    description: 'Comma-separated list of meta keys to ignore in frontmatter',
    default: ''
  }
]

export async function getConfig (argv) {
  extendOptionsData();
  const unaliasedArgv = replaceAliases(argv);
  const program = parseCommandLine(unaliasedArgv);

  // Load config file if it exists
  const fileConfig = loadConfigFile()

  let answers
  if (program.wizard) {
    console.log('\nStarting wizard...')
    const questions = options.map(option => ({
      when: option.name !== 'wizard' && !option.isProvided,
      name: camelcase(option.name),
      type: option.prompt,
      message: option.description + '?',
      default: option.default,

      // these are not used for all option types and that's fine
      filter: option.coerce,
      validate: option.validate
    }))
    answers = await inquirer.prompt(questions)
  } else {
    console.log('\nSkipping wizard...')
    answers = {}
  }

  // Get only the options that were explicitly provided via command line
  const cmdLineOpts = {}
  options.forEach(option => {
    if (option.isProvided) {
      const key = camelcase(option.name)
      cmdLineOpts[key] = program.opts()[key]
    }
  })
  
  // Merge configs: command-line args > wizard answers > file config > defaults
  const config = { ...program.opts(), ...fileConfig, ...cmdLineOpts, ...answers }
  return config
}

function loadConfigFile () {
  const configPath = path.join(process.cwd(), 'wordpress-export-config.json')
  
  try {
    if (fs.existsSync(configPath)) {
      console.log('Loading config from wordpress-export-config.json...')
      const configContent = fs.readFileSync(configPath, 'utf8')
      const config = JSON.parse(configContent)
      
      // Convert ignoreMetaKeys array to comma-separated string if it's an array
      if (config.ignoreMetaKeys && Array.isArray(config.ignoreMetaKeys)) {
        config.ignoreMetaKeys = config.ignoreMetaKeys.join(',')
      }
      
      return config
    }
  } catch (error) {
    console.warn('Warning: Could not load config file:', error.message)
  }
  
  return {}
}

function extendOptionsData () {
  // add more data to each option based on its type
  const map = {
    boolean: {
      prompt: 'confirm',
      coerce: coerceBoolean
    },
    file: {
      prompt: 'input',
      coerce: coercePath,
      validate: validateFile
    },
    folder: {
      prompt: 'input',
      coerce: coercePath
    },
    string: {
      prompt: 'input',
      coerce: (value) => value.toString()
    }
  }

  options.forEach(option => {
    Object.assign(option, map[option.type])
  })
}

function replaceAliases (argv) {
  const paths = argv.slice(0, 2)
  const replaced = []
  const unmodified = []

  argv.slice(2).forEach(arg => {
    let aliasFound = false

    // this loop does not short circuit because an alias can map to multiple options
    options.forEach(option => {
      const aliases = option.aliases || []
      aliases.forEach(alias => {
        if (arg.includes('--' + alias)) {
          replaced.push(arg.replace('--' + alias, '--' + option.name))
          aliasFound = true
        }
      })
    })

    if (!aliasFound) {
      unmodified.push(arg)
    }
  })

  return [...paths, ...replaced, ...unmodified]
}

function parseCommandLine (argv) {
  // setup for help output
  const program = new Command();
  program
    .name('node index.js')
    .helpOption('-h, --help', 'See the thing you\'re looking at right now')
    .on('--help', () => {
      console.log('\nMore documentation is at https://github.com/lonekorean/wordpress-export-to-markdown');
    });

  options.forEach(input => {
    const flag = '--' + input.name + ' <' + input.type + '>';
    const coerce = (value) => {
      // commander only calls coerce when an input is provided on the command line, which
      // makes for an easy way to flag (for later) if it should be excluded from the wizard
      input.isProvided = true;
      return input.coerce(value);
    };
    program.option(flag, input.description, coerce, input.default);
  });

  return program.parse(argv);
}

function coerceBoolean (value) {
  return !['false', 'no', '0'].includes(value.toLowerCase())
}

function coercePath (value) {
  return path.normalize(value)
}

function validateFile (value) {
  let isValid
  try {
    isValid = fs.existsSync(value) && fs.statSync(value).isFile()
  } catch (ex) {
    isValid = false
  }

  return isValid ? true : 'Unable to find file: ' + path.resolve(value);
}
