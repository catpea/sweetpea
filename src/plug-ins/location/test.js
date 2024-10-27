#!/usr/bin/env node
import { strict as assert } from 'node:assert';

import location from './index.js';

assert.equal( location('https://catpea.github.io/trailing-slash/'), '/trailing-slash' );
assert.equal( location('https://catpea.github.io/sweetpea'), '/sweetpea' );
assert.equal( location('http://127.0.0.1:8082/subfolder/index.html'), '/subfolder' );
assert.equal( location('http://127.0.0.1:8082/index.html'), '' );
assert.equal( location('chrome-extension://mdejpimplliielehdfnafeoobekngnfk/index.html'), '' );
