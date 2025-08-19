import { Legale } from './index.js';

import * as inquirer from '@inquirer/prompts';

const email = await inquirer.input({
    required: true,
    message: 'email:'
});

const password = await inquirer.password({
    message: 'pass:',
    mask: '💀'
});

const legale = new Legale({ test: true });
await legale.getToken(email, password);