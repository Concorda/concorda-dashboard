![Banner][]

# Concorda Dashboard
Concorda: User management system

- __Lead Maintainer:__ [Mircea Alexandru][lead]
- __Sponsor:__ [nearForm][]

## Demo system
This is the Concorda project. It is a user management system built using Node.js. It is a micro-service designed to be used in tandem with other micro-services, as with the [NodeZoo][] project. There is an in-depth demo configuration available for the system, to learn more go [here][].

## Running
To run the server,

1. Run `npm install` to install all dependencies
2. Copy config/sample.env to config/production.env or config/development.env and put the right configuration in there 
3. Run `npm run build` to build the project
4. Run `npm run start` to create a deploy and server on port `3050` in production mode
	OR
	`npm run start:dev` to create a deploy and server on port `3050` in development mode

Also you can watch the files for changes and automatically rebuild the sources by running `npm run watch`
in a different terminal.

## Documentation

This project is in it's infancy, documentation will come after stability.

## Server API

Server API is implemented as separate plugin. For details please check [Concorda-API]'s repository.


## Contributing
The [Concorda][] encourages open participation. If you feel you can help in any way, be it with
documentation, examples, extra testing, or new features please get in touch.

- [Code of Conduct]

## License
Copyright (c) 2016, nearForm and other contributors.
Licensed under [MIT][].

[Banner]: https://raw.githubusercontent.com/nearform/concorda-dashboard/master/public/client/assets/img/logo-concorda-banner.png
[here]: https://github.com/nearform/vidi-concorda-nodezoo-system
[MIT]: ./LICENSE
[Code of Conduct]: https://github.com/nearform/vidi-contrib/docs/code_of_conduct.md
[Concorda-API]: https://github.com/nearform/concorda-api
[Concorda]: https://github.com/nearform/concorda-dashboard
[lead]: https://github.com/mirceaalexandru
[nearForm]: http://www.nearform.com/
[NodeZoo]: http://www.nodezoo.com/
