# GK3_Portal
Repository for the GK3_Portal

Intital Release branch to deploy on tunesia for testing.


$ npm outdated
Package          Current  Wanted  Latest  Location
bcrypt           MISSING   0.8.7   0.8.7  bcrypt
body-parser       1.15.0  1.15.2  1.15.2  body-parser
cookie-parser      1.4.1   1.4.3   1.4.3  cookie-parser
ejs                2.4.1   2.5.1   2.5.1  ejs
express-session   1.13.0  1.14.0  1.14.0  express-session
passport           0.2.2   0.3.2   0.3.2  passport
request           2.69.0  2.74.0  2.74.0  request


http://javascript.tutorialhorizon.com/2015/03/21/what-is-npm-shrinkwrap-and-when-is-it-needed/  ===========READ TO KNOW MORE ABOUT NPM SHRINKWRAP



$ npm version
{ gk3_portal: '1.0.0',
  npm: '2.15.8',
  ares: '1.10.1-DEV',
  http_parser: '2.5.2',
  icu: '56.1',
  modules: '46',
  node: '4.4.7',
  openssl: '1.0.2h',
  uv: '1.8.0',
  v8: '4.5.103.36',
  zlib: '1.2.8' }

$ npm list
gk3_portal@1.0.0 C:\git\GK3_Portal
├── app-root-path@1.2.1 extraneous
├── UNMET DEPENDENCY bcrypt@^0.8.7
├── bcrypt-nodejs@0.0.3
├─┬ body-parser@1.15.0 invalid
│ ├── bytes@2.2.0
│ ├── content-type@1.0.2
│ ├─┬ debug@2.2.0
│ │ └── ms@0.7.1
│ ├── depd@1.1.0
│ ├─┬ http-errors@1.4.0
│ │ ├── inherits@2.0.1
│ │ └── statuses@1.3.0
│ ├── iconv-lite@0.4.13
│ ├─┬ on-finished@2.3.0
│ │ └── ee-first@1.1.1
│ ├── qs@6.1.0
│ ├─┬ raw-body@2.1.7
│ │ ├── bytes@2.4.0
│ │ └── unpipe@1.0.0
│ └─┬ type-is@1.6.13
│   ├── media-typer@0.3.0
│   └─┬ mime-types@2.1.11
│     └── mime-db@1.23.0
├── bson@0.2.22 extraneous
├── config@1.19.0 extraneous
├── connect-flash@0.1.1
├─┬ cookie-parser@1.4.1 invalid
│ ├── cookie@0.2.3
│ └── cookie-signature@1.0.6
├─┬ dateformat@1.0.12
│ ├── get-stdin@4.0.1
│ └─┬ meow@3.7.0
│   ├─┬ camelcase-keys@2.1.0
│   │ └── camelcase@2.1.1
│   ├── decamelize@1.2.0
│   ├─┬ loud-rejection@1.6.0
│   │ ├─┬ currently-unhandled@0.4.1
│   │ │ └── array-find-index@1.0.1
│   │ └── signal-exit@3.0.0
│   ├── map-obj@1.0.1
│   ├── minimist@1.2.0
│   ├─┬ normalize-package-data@2.3.5
│   │ ├── hosted-git-info@2.1.5
│   │ ├─┬ is-builtin-module@1.0.0
│   │ │ └── builtin-modules@1.1.1
│   │ ├── semver@5.2.0
│   │ └─┬ validate-npm-package-license@3.0.1
│   │   ├─┬ spdx-correct@1.0.2
│   │   │ └── spdx-license-ids@1.2.1
│   │   └─┬ spdx-expression-parse@1.0.2
│   │     ├── spdx-exceptions@1.0.4
│   │     └── spdx-license-ids@1.2.1
│   ├── object-assign@4.1.0
│   ├─┬ read-pkg-up@1.0.1
│   │ ├─┬ find-up@1.1.2
│   │ │ ├── path-exists@2.1.0
│   │ │ └─┬ pinkie-promise@2.0.1
│   │ │   └── pinkie@2.0.4
│   │ └─┬ read-pkg@1.1.0
│   │   ├─┬ load-json-file@1.1.0
│   │   │ ├── graceful-fs@4.1.4
│   │   │ ├─┬ parse-json@2.2.0
│   │   │ │ └─┬ error-ex@1.3.0
│   │   │ │   └── is-arrayish@0.2.1
│   │   │ ├── pify@2.3.0
│   │   │ ├─┬ pinkie-promise@2.0.1
│   │   │ │ └── pinkie@2.0.4
│   │   │ └─┬ strip-bom@2.0.0
│   │   │   └── is-utf8@0.2.1
│   │   └─┬ path-type@1.1.0
│   │     ├── graceful-fs@4.1.4
│   │     ├── pify@2.3.0
│   │     └─┬ pinkie-promise@2.0.1
│   │       └── pinkie@2.0.4
│   ├─┬ redent@1.0.0
│   │ ├─┬ indent-string@2.1.0
│   │ │ └─┬ repeating@2.0.1
│   │ │   └─┬ is-finite@1.0.1
│   │ │     └── number-is-nan@1.0.0
│   │ └── strip-indent@1.0.1
│   └── trim-newlines@1.0.0
├── debug@2.2.0 extraneous
├── ejs@2.4.1 invalid
├── express@4.13.4 extraneous
├─┬ express-session@1.13.0 invalid
│ ├── cookie@0.2.3
│ ├── cookie-signature@1.0.6
│ ├── crc@3.4.0
│ ├─┬ debug@2.2.0
│ │ └── ms@0.7.1
│ ├── depd@1.1.0
│ ├── on-headers@1.0.1
│ ├── parseurl@1.3.1
│ ├─┬ uid-safe@2.0.0
│ │ └── base64-url@1.2.1
│ └── utils-merge@1.0.0
├── express-winston@1.4.2 extraneous
├── forever@0.15.2 extraneous
├── http-proxy@1.14.0 extraneous
├── mongoose@3.8.39 extraneous
├─┬ morgan@1.7.0
│ ├── basic-auth@1.0.4
│ ├─┬ debug@2.2.0
│ │ └── ms@0.7.1
│ ├── depd@1.1.0
│ ├─┬ on-finished@2.3.0
│ │ └── ee-first@1.1.1
│ └── on-headers@1.0.1
├── mysql@2.5.5 extraneous
├─┬ passport@0.2.2 invalid
│ ├── passport-strategy@1.0.0
│ └── pause@0.0.1
├─┬ passport-local@1.0.0
│ └── passport-strategy@1.0.0
├─┬ request@2.69.0 invalid
│ ├── aws-sign2@0.6.0
│ ├── aws4@1.4.1
│ ├─┬ bl@1.0.3
│ │ └─┬ readable-stream@2.0.6
│ │   ├── core-util-is@1.0.2
│ │   ├── inherits@2.0.1
│ │   ├── isarray@1.0.0
│ │   ├── process-nextick-args@1.0.7
│ │   ├── string_decoder@0.10.31
│ │   └── util-deprecate@1.0.2
│ ├── caseless@0.11.0
│ ├─┬ combined-stream@1.0.5
│ │ └── delayed-stream@1.0.0
│ ├── extend@3.0.0
│ ├── forever-agent@0.6.1
│ ├─┬ form-data@1.0.0-rc4
│ │ └── async@1.5.2
│ ├─┬ har-validator@2.0.6
│ │ ├─┬ chalk@1.1.3
│ │ │ ├── ansi-styles@2.2.1
│ │ │ ├── escape-string-regexp@1.0.5
│ │ │ ├─┬ has-ansi@2.0.0
│ │ │ │ └── ansi-regex@2.0.0
│ │ │ ├─┬ strip-ansi@3.0.1
│ │ │ │ └── ansi-regex@2.0.0
│ │ │ └── supports-color@2.0.0
│ │ ├─┬ commander@2.9.0
│ │ │ └── graceful-readlink@1.0.1
│ │ ├─┬ is-my-json-valid@2.13.1
│ │ │ ├── generate-function@2.0.0
│ │ │ ├─┬ generate-object-property@1.2.0
│ │ │ │ └── is-property@1.0.2
│ │ │ ├── jsonpointer@2.0.0
│ │ │ └── xtend@4.0.1
│ │ └─┬ pinkie-promise@2.0.1
│ │   └── pinkie@2.0.4
│ ├─┬ hawk@3.1.3
│ │ ├── boom@2.10.1
│ │ ├── cryptiles@2.0.5
│ │ ├── hoek@2.16.3
│ │ └── sntp@1.0.9
│ ├─┬ http-signature@1.1.1
│ │ ├── assert-plus@0.2.0
│ │ ├─┬ jsprim@1.3.0
│ │ │ ├── extsprintf@1.0.2
│ │ │ ├── json-schema@0.2.2
│ │ │ └── verror@1.3.6
│ │ └─┬ sshpk@1.8.3
│ │   ├── asn1@0.2.3
│ │   ├── assert-plus@1.0.0
│ │   ├── dashdash@1.14.0
│ │   ├── ecc-jsbn@0.1.1
│ │   ├── getpass@0.1.6
│ │   ├── jodid25519@1.0.2
│ │   ├── jsbn@0.1.0
│ │   └── tweetnacl@0.13.3
│ ├── is-typedarray@1.0.0
│ ├── isstream@0.1.2
│ ├── json-stringify-safe@5.0.1
│ ├─┬ mime-types@2.1.11
│ │ └── mime-db@1.23.0
│ ├── node-uuid@1.4.7
│ ├── oauth-sign@0.8.2
│ ├── qs@6.0.2
│ ├── stringstream@0.0.5
│ ├── tough-cookie@2.2.2
│ └── tunnel-agent@0.4.3
├── route@0.2.5 extraneous
├── router@1.1.4 extraneous
└─┬ winston@2.2.0
  ├── async@1.0.0
  ├── colors@1.0.3
  ├── cycle@1.0.3
  ├── eyes@0.1.8
  ├── isstream@0.1.2
  ├── pkginfo@0.3.1
  └── stack-trace@0.0.9

npm ERR! missing: bcrypt@^0.8.7, required by gk3_portal@1.0.0
npm ERR! invalid: body-parser@1.15.0 C:\git\GK3_Portal\node_modules\body-parser
npm ERR! invalid: cookie-parser@1.4.1 C:\git\GK3_Portal\node_modules\cookie-parser
npm ERR! invalid: ejs@2.4.1 C:\git\GK3_Portal\node_modules\ejs
npm ERR! invalid: express-session@1.13.0 C:\git\GK3_Portal\node_modules\express-session
npm ERR! invalid: passport@0.2.2 C:\git\GK3_Portal\node_modules\passport
npm ERR! invalid: request@2.69.0 C:\git\GK3_Portal\node_modules\request
npm ERR! extraneous: app-root-path@1.2.1 C:\git\GK3_Portal\node_modules\app-root-path
npm ERR! extraneous: route@0.2.5 C:\git\GK3_Portal\node_modules\route
npm ERR! extraneous: bson@0.2.22 C:\git\GK3_Portal\node_modules\bson
npm ERR! extraneous: config@1.19.0 C:\git\GK3_Portal\node_modules\config
npm ERR! extraneous: debug@2.2.0 C:\git\GK3_Portal\node_modules\debug
npm ERR! extraneous: http-proxy@1.14.0 C:\git\GK3_Portal\node_modules\http-proxy
npm ERR! extraneous: router@1.1.4 C:\git\GK3_Portal\node_modules\router
npm ERR! extraneous: mysql@2.5.5 C:\git\GK3_Portal\node_modules\mysql
npm ERR! extraneous: express-winston@1.4.2 C:\git\GK3_Portal\node_modules\express-winston
npm ERR! extraneous: mongoose@3.8.39 C:\git\GK3_Portal\node_modules\mongoose
npm ERR! extraneous: express@4.13.4 C:\git\GK3_Portal\node_modules\express
npm ERR! extraneous: forever@0.15.2 C:\git\GK3_Portal\node_modules\forever

=============================================================================================================================================

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ node server.js
module.js:327
    throw err;
    ^

Error: Cannot find module 'express'
    at Function.Module._resolveFilename (module.js:325:15)
    at Function.Module._load (module.js:276:25)
    at Module.require (module.js:353:17)
    at require (internal/module.js:12:17)
    at Object.<anonymous> (C:\GK3\server.js:2:16)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ npm install express
npm WARN package.json gk3_portal@1.0.0 No repository field.
express@4.14.0 node_modules\express
├── escape-html@1.0.3
├── content-type@1.0.2
├── merge-descriptors@1.0.1
├── methods@1.1.2
├── encodeurl@1.0.1
├── cookie-signature@1.0.6
├── fresh@0.3.0
├── parseurl@1.3.1
├── content-disposition@0.5.1
├── vary@1.1.0
├── etag@1.7.0
├── range-parser@1.2.0
├── serve-static@1.11.1
├── array-flatten@1.1.1
├── utils-merge@1.0.0
├── cookie@0.3.1
├── path-to-regexp@0.1.7
├── depd@1.1.0
├── qs@6.2.0
├── on-finished@2.3.0 (ee-first@1.1.1)
├── finalhandler@0.5.0 (unpipe@1.0.0, statuses@1.3.0)
├── debug@2.2.0 (ms@0.7.1)
├── proxy-addr@1.1.2 (forwarded@0.1.0, ipaddr.js@1.1.1)
├── type-is@1.6.13 (media-typer@0.3.0, mime-types@2.1.11)
├── accepts@1.3.3 (negotiator@0.6.1, mime-types@2.1.11)
└── send@0.14.1 (destroy@1.0.4, statuses@1.3.0, ms@0.7.1, mime@1.3.4, http-errors@1.5.0)

vandana@mobad2-PC MINGW64 /c/GK3 (master)
$ node server.js
module.js:327
    throw err;
    ^

Error: Cannot find module 'http-proxy'
    at Function.Module._resolveFilename (module.js:325:15)
    at Function.Module._load (module.js:276:25)
    at Module.require (module.js:353:17)
    at require (internal/module.js:12:17)
    at Object.<anonymous> (C:\GK3\server.js:5:17)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ npm install http-proxy
npm WARN package.json gk3_portal@1.0.0 No repository field.
http-proxy@1.14.0 node_modules\http-proxy
├── eventemitter3@1.2.0
└── requires-port@1.0.0

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$


avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ node server.js
module.js:327
    throw err;
    ^

Error: Cannot find module 'mysql'
    at Function.Module._resolveFilename (module.js:325:15)
    at Function.Module._load (module.js:276:25)
    at Module.require (module.js:353:17)
    at require (internal/module.js:12:17)
    at Object.<anonymous> (C:\GK3\server.js:10:13)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ npm install mysql
npm WARN package.json gk3_portal@1.0.0 No repository field.
mysql@2.11.1 node_modules\mysql
├── sqlstring@2.0.1
├── bignumber.js@2.3.0
└── readable-stream@1.1.14 (inherits@2.0.1, isarray@0.0.1, string_decoder@0.10.31, core-util-is@1.0.2)


avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ node server.js
module.js:327
    throw err;
    ^

Error: Cannot find module 'passport'
    at Function.Module._resolveFilename (module.js:325:15)
    at Function.Module._load (module.js:276:25)
    at Module.require (module.js:353:17)
    at require (internal/module.js:12:17)
    at Object.<anonymous> (C:\GK3\server.js:11:16)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ npm install passport
npm WARN package.json gk3_portal@1.0.0 No repository field.
passport@0.3.2 node_modules\passport
├── pause@0.0.1
└── passport-strategy@1.0.0

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$
avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ node server.js
module.js:327
    throw err;
    ^

Error: Cannot find module 'connect-flash'
    at Function.Module._resolveFilename (module.js:325:15)
    at Function.Module._load (module.js:276:25)
    at Module.require (module.js:353:17)
    at require (internal/module.js:12:17)
    at Object.<anonymous> (C:\GK3\server.js:12:16)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ npm install connect-flash
npm WARN package.json gk3_portal@1.0.0 No repository field.
connect-flash@0.1.1 node_modules\connect-flash

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$

$ node server.js
module.js:327
    throw err;
    ^

Error: Cannot find module 'morgan'
    at Function.Module._resolveFilename (module.js:325:15)
    at Function.Module._load (module.js:276:25)
    at Module.require (module.js:353:17)
    at require (internal/module.js:12:17)
    at Object.<anonymous> (C:\GK3\server.js:14:20)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ npm install morgan
npm WARN package.json gk3_portal@1.0.0 No repository field.
morgan@1.7.0 node_modules\morgan
├── basic-auth@1.0.4
├── on-headers@1.0.1
├── depd@1.1.0
├── on-finished@2.3.0 (ee-first@1.1.1)
└── debug@2.2.0 (ms@0.7.1)

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ node server.js
module.js:327
    throw err;
    ^

Error: Cannot find module 'cookie-parser'
    at Function.Module._resolveFilename (module.js:325:15)
    at Function.Module._load (module.js:276:25)
    at Module.require (module.js:353:17)
    at require (internal/module.js:12:17)
    at Object.<anonymous> (C:\GK3\server.js:15:20)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ npm install cookie-parser
npm WARN package.json gk3_portal@1.0.0 No repository field.
cookie-parser@1.4.3 node_modules\cookie-parser
├── cookie-signature@1.0.6
└── cookie@0.3.1

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$

vandana@mobad2-PC MINGW64 /c/GK3 (master)
$ node server.js
module.js:327
    throw err;
    ^

Error: Cannot find module 'body-parser'
    at Function.Module._resolveFilename (module.js:325:15)
    at Function.Module._load (module.js:276:25)
    at Module.require (module.js:353:17)
    at require (internal/module.js:12:17)
    at Object.<anonymous> (C:\GK3\server.js:16:20)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ npm install body-parser
npm WARN package.json gk3_portal@1.0.0 No repository field.
body-parser@1.15.2 node_modules\body-parser
├── content-type@1.0.2
├── bytes@2.4.0
├── depd@1.1.0
├── qs@6.2.0
├── on-finished@2.3.0 (ee-first@1.1.1)
├── http-errors@1.5.0 (setprototypeof@1.0.1, inherits@2.0.1, statuses@1.3.0)
├── raw-body@2.1.7 (unpipe@1.0.0)
├── debug@2.2.0 (ms@0.7.1)
├── iconv-lite@0.4.13
└── type-is@1.6.13 (media-typer@0.3.0, mime-types@2.1.11)

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ node server.js
module.js:327
    throw err;
    ^

Error: Cannot find module 'express-session'
    at Function.Module._resolveFilename (module.js:325:15)
    at Function.Module._load (module.js:276:25)
    at Module.require (module.js:353:17)
    at require (internal/module.js:12:17)
    at Object.<anonymous> (C:\GK3\server.js:17:20)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ npm install express-session
npm WARN package.json gk3_portal@1.0.0 No repository field.
express-session@1.14.0 node_modules\express-session
├── utils-merge@1.0.0
├── on-headers@1.0.1
├── cookie-signature@1.0.6
├── cookie@0.3.1
├── parseurl@1.3.1
├── depd@1.1.0
├── crc@3.4.0
├── debug@2.2.0 (ms@0.7.1)
└── uid-safe@2.1.1 (base64-url@1.2.2, random-bytes@1.0.0)

avandana@mobad2-PC MINGW64 /c/GK3 (master)

vandana@mobad2-PC MINGW64 /c/GK3 (master)
$ node server.js
module.js:327
    throw err;
    ^

Error: Cannot find module 'winston'
    at Function.Module._resolveFilename (module.js:325:15)
    at Function.Module._load (module.js:276:25)
    at Module.require (module.js:353:17)
    at require (internal/module.js:12:17)
    at Object.<anonymous> (C:\GK3\app\logger.js:2:15)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Module.require (module.js:353:17)

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ npm install winston
npm WARN package.json gk3_portal@1.0.0 No repository field.
winston@2.2.0 node_modules\winston
├── cycle@1.0.3
├── isstream@0.1.2
├── eyes@0.1.8
├── stack-trace@0.0.9
├── async@1.0.0
├── pkginfo@0.3.1
└── colors@1.0.3

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ node server.js
2016-07-28T15:08:40.961Z - error: uncaughtException: Cannot find module 'passport-local' date=Thu Jul 28 2016 11:08:40 GMT-0400 (Eastern Daylight Time), pid=7824, uid=null, gid=null, cwd=C:\GK3, execPath=C:\nodejs\node.exe, version=v4.4.7, argv=[C:\nodejs\node.exe, C:\GK
3\server.js], rss=35581952, heapTotal=20812368, heapUsed=14120904, loadavg=[0, 0, 0], uptime=188374.7384657, trace=[column=15, file=module.js, function=Function.Module._resolveFilename, line=325, method=Module._resolveFilename, native=false, column=25, file=module.js, fu
nction=Function.Module._load, line=276, method=Module._load, native=false, column=17, file=module.js, function=Module.require, line=353, method=require, native=false, column=17, file=internal/module.js, function=require, line=12, method=null, native=false, column=24, fil
e=C:\GK3\app\passport.js, function=, line=3, method=null, native=false, column=26, file=module.js, function=Module._compile, line=409, method=_compile, native=false, column=10, file=module.js, function=Object.Module._extensions..js, line=416, method=Module._extensions..j
s, native=false, column=32, file=module.js, function=Module.load, line=343, method=load, native=false, column=12, file=module.js, function=Function.Module._load, line=300, method=Module._load, native=false, column=17, file=module.js, function=Module.require, line=353, me
thod=require, native=false], stack=[Error: Cannot find module 'passport-local',     at Function.Module._resolveFilename (module.js:325:15),     at Function.Module._load (module.js:276:25),     at Module.require (module.js:353:17),     at require (internal/module.js:12:17
),     at Object.<anonymous> (C:\GK3\app\passport.js:3:24),     at Module._compile (module.js:409:26),     at Object.Module._extensions..js (module.js:416:10),     at Module.load (module.js:343:32),     at Function.Module._load (module.js:300:12),     at Module.require (
module.js:353:17)]

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ npm install passport-local
npm WARN package.json gk3_portal@1.0.0 No repository field.
passport-local@1.0.0 node_modules\passport-local
└── passport-strategy@1.0.0

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$
$ clear

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ node server.js
2016-07-28T15:09:15.913Z - error: uncaughtException: Cannot find module 'bcrypt-nodejs' date=Thu Jul 28 2016 11:09:15 GMT-0400 (Eastern Daylight Time), pid=10632, uid=null, gid=null, cwd=C:\GK3, execPath=C:\nodejs\node.exe, version=v4.4.7, argv=[C:\nodejs\node.exe, C:\GK
3\server.js], rss=35536896, heapTotal=20812368, heapUsed=14455440, loadavg=[0, 0, 0], uptime=188409.6905186, trace=[column=15, file=module.js, function=Function.Module._resolveFilename, line=325, method=Module._resolveFilename, native=false, column=25, file=module.js, fu
nction=Function.Module._load, line=276, method=Module._load, native=false, column=17, file=module.js, function=Module.require, line=353, method=require, native=false, column=17, file=internal/module.js, function=require, line=12, method=null, native=false, column=14, fil
e=C:\GK3\app\passport.js, function=, line=7, method=null, native=false, column=26, file=module.js, function=Module._compile, line=409, method=_compile, native=false, column=10, file=module.js, function=Object.Module._extensions..js, line=416, method=Module._extensions..j
s, native=false, column=32, file=module.js, function=Module.load, line=343, method=load, native=false, column=12, file=module.js, function=Function.Module._load, line=300, method=Module._load, native=false, column=17, file=module.js, function=Module.require, line=353, me
thod=require, native=false], stack=[Error: Cannot find module 'bcrypt-nodejs',     at Function.Module._resolveFilename (module.js:325:15),     at Function.Module._load (module.js:276:25),     at Module.require (module.js:353:17),     at require (internal/module.js:12:17)
,     at Object.<anonymous> (C:\GK3\app\passport.js:7:14),     at Module._compile (module.js:409:26),     at Object.Module._extensions..js (module.js:416:10),     at Module.load (module.js:343:32),     at Function.Module._load (module.js:300:12),     at Module.require (m
odule.js:353:17)]

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ npm install bcrypt-nodejs
npm WARN package.json gk3_portal@1.0.0 No repository field.
bcrypt-nodejs@0.0.3 node_modules\bcrypt-nodejs

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ node server.js
2016-07-28T15:09:35.766Z - debug: util.js:checkAuthentication= true
2016-07-28T15:09:35.786Z - error: uncaughtException: Cannot find module 'request' date=Thu Jul 28 2016 11:09:35 GMT-0400 (Eastern Daylight Time), pid=12124, uid=null, gid=null, cwd=C:\GK3, execPath=C:\nodejs\node.exe, version=v4.4.7, argv=[C:\nodejs\node.exe, C:\GK3\serv
er.js], rss=37629952, heapTotal=30099792, heapUsed=15961472, loadavg=[0, 0, 0], uptime=188429.5535511, trace=[column=15, file=module.js, function=Function.Module._resolveFilename, line=325, method=Module._resolveFilename, native=false, column=25, file=module.js, function
=Function.Module._load, line=276, method=Module._load, native=false, column=17, file=module.js, function=Module.require, line=353, method=require, native=false, column=17, file=internal/module.js, function=require, line=12, method=null, native=false, column=15, file=C:\G
K3\app\routes\appMapper.js, function=, line=15, method=null, native=false, column=26, file=module.js, function=Module._compile, line=409, method=_compile, native=false, column=10, file=module.js, function=Object.Module._extensions..js, line=416, method=Module._extensions
..js, native=false, column=32, file=module.js, function=Module.load, line=343, method=load, native=false, column=12, file=module.js, function=Function.Module._load, line=300, method=Module._load, native=false, column=17, file=module.js, function=Module.require, line=353,
 method=require, native=false], stack=[Error: Cannot find module 'request',     at Function.Module._resolveFilename (module.js:325:15),     at Function.Module._load (module.js:276:25),     at Module.require (module.js:353:17),     at require (internal/module.js:12:17),
   at Object.<anonymous> (C:\GK3\app\routes\appMapper.js:15:15),     at Module._compile (module.js:409:26),     at Object.Module._extensions..js (module.js:416:10),     at Module.load (module.js:343:32),     at Function.Module._load (module.js:300:12),     at Module.requ
ire (module.js:353:17)]

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ npm install request
npm WARN package.json gk3_portal@1.0.0 No repository field.
request@2.74.0 node_modules\request
├── aws-sign2@0.6.0
├── forever-agent@0.6.1
├── tunnel-agent@0.4.3
├── oauth-sign@0.8.2
├── is-typedarray@1.0.0
├── caseless@0.11.0
├── stringstream@0.0.5
├── isstream@0.1.2
├── aws4@1.4.1
├── json-stringify-safe@5.0.1
├── extend@3.0.0
├── tough-cookie@2.3.1
├── node-uuid@1.4.7
├── qs@6.2.1
├── combined-stream@1.0.5 (delayed-stream@1.0.0)
├── mime-types@2.1.11 (mime-db@1.23.0)
├── form-data@1.0.0-rc4 (async@1.5.2)
├── bl@1.1.2 (readable-stream@2.0.6)
├── hawk@3.1.3 (cryptiles@2.0.5, boom@2.10.1, sntp@1.0.9, hoek@2.16.3)
├── http-signature@1.1.1 (assert-plus@0.2.0, jsprim@1.3.0, sshpk@1.9.0)
└── har-validator@2.0.6 (pinkie-promise@2.0.1, commander@2.9.0, chalk@1.1.3, is-my-json-valid@2.13.1)


avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ node server.js
2016-07-28T15:10:25.247Z - debug: util.js:checkAuthentication= true
2016-07-28T15:10:25.417Z - error: uncaughtException: Cannot find module 'dateformat' date=Thu Jul 28 2016 11:10:25 GMT-0400 (Eastern Daylight Time), pid=10056, uid=null, gid=null, cwd=C:\GK3, execPath=C:\nodejs\node.exe, version=v4.4.7, argv=[C:\nodejs\node.exe, C:\GK3\s
erver.js], rss=48693248, heapTotal=35296592, heapUsed=20756496, loadavg=[0, 0, 0], uptime=188479.1846273, trace=[column=15, file=module.js, function=Function.Module._resolveFilename, line=325, method=Module._resolveFilename, native=false, column=25, file=module.js, funct
ion=Function.Module._load, line=276, method=Module._load, native=false, column=17, file=module.js, function=Module.require, line=353, method=require, native=false, column=17, file=internal/module.js, function=require, line=12, method=null, native=false, column=18, file=C
:\GK3\app\routes\appMapper.js, function=, line=16, method=null, native=false, column=26, file=module.js, function=Module._compile, line=409, method=_compile, native=false, column=10, file=module.js, function=Object.Module._extensions..js, line=416, method=Module._extensi
ons..js, native=false, column=32, file=module.js, function=Module.load, line=343, method=load, native=false, column=12, file=module.js, function=Function.Module._load, line=300, method=Module._load, native=false, column=17, file=module.js, function=Module.require, line=3
53, method=require, native=false], stack=[Error: Cannot find module 'dateformat',     at Function.Module._resolveFilename (module.js:325:15),     at Function.Module._load (module.js:276:25),     at Module.require (module.js:353:17),     at require (internal/module.js:12:
17),     at Object.<anonymous> (C:\GK3\app\routes\appMapper.js:16:18),     at Module._compile (module.js:409:26),     at Object.Module._extensions..js (module.js:416:10),     at Module.load (module.js:343:32),     at Function.Module._load (module.js:300:12),     at Modul
e.require (module.js:353:17)]

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ npm install dateformat
npm WARN package.json gk3_portal@1.0.0 No repository field.
dateformat@1.0.12 node_modules\dateformat
├── get-stdin@4.0.1
└── meow@3.7.0 (trim-newlines@1.0.0, map-obj@1.0.1, decamelize@1.2.0, object-assign@4.1.0, camelcase-keys@2.1.0, minimist@1.2.0, loud-rejection@1.6.0, redent@1.0.0, read-pkg-up@1.0.1, normalize-package-data@2.3.5)

avandana@mobad2-PC MINGW64 /c/GK3 (master)
$ node server.js
2016-07-28T15:10:39.647Z - debug: util.js:checkAuthentication= true
2016-07-28T15:10:39.807Z - debug: default_illegal_odds= 0.7
2016-07-28T15:10:39.807Z - debug: default_illegal_odds= 0.7
2016-07-28T15:10:39.807Z - debug: serviceUrl= http://10.212.2.143:8080
2016-07-28T15:10:39.817Z - debug: The magic happens on http port 8580





