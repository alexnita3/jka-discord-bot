[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Discord Jedi Knight Academy Bot</h3>

  <p align="center">
    A bot made to automatically query a JKA (Jedi Knight Academy) server.
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

Jedi Knight Academy is an admittedly old game, but it still has a fair bt of populated ervers. Much of the comunities there also have a discord group. 

Hence, this project has the followin aims :
* Make a discord bot that can query a JKA server (My own need at first)
* Make it easy for others to deploy the same bot in their own communities
* Add potential for extending the functionality to include other features

This was started from my own need of being able to quickly see who is online in a server at a given time without having to start the game and log in.

### Built With
* [Discord.js](https://discord.js.org/#/)
* [Node](https://nodejs.org/en/)
* [GameDig](https://www.npmjs.com/package/gamedig)



<!-- GETTING STARTED -->
## Getting Started

This can be run locally, as well as hosted on a remote server. My recommendation is to use Heroku as it is free and easy-to-use.

### Prerequisites

You need to have installed the following:
* npm
```sh
npm install npm@latest -g
```
* Node
```sh
sudo apt get install node
```

### Installation

1. Create a Discord Bot by following [their own documentation](https://discord.com/developers/docs/intro)
2. Modify the main file (discordBotJka.js) to add the following parameters:
    * token - the secret token of your bot (Taken from the Discord Developer Portal)
    * server1IP - The IP of the server
    * server1Port - The port that the server is running on
    * channelName - The ID of the channel that you want the bot to post to (YOu can get this by turning on developer mode in your discord setting and right-clicking the channel)


3. Add the bot to your server

You might need 'Manage Server' Permissions so beware.

4. Open a terminal window inside the cloned repository folder and run the following command
```sh
node discordBotJka.js
```

5. (Optional) Upload to heroku and run the dyno that is included in the procfile


<!-- USAGE EXAMPLES -->
## Usage

Use this on a dicord server to access data about current players on a JKA server. There is more than just what's being displayed there, so feel free to take a look at the logs (It will log the whole retrieved object)


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/alexnita3/jka-discord-bot/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- LICENSE -->
## License

Distributed under the GPL-3.0 License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/alexnita3/jka-discord-bot](https://github.com/alexnita3/jka-discord-bot)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/alexnita3/jka-discord-bot.svg?style=flat-square
[contributors-url]: https://github.com/alexnita3/jka-discord-bot/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/alexnita3/jka-discord-bot.svg?style=flat-square
[forks-url]: https://github.com/alexnita3/jka-discord-bot/network/members
[stars-shield]: https://img.shields.io/github/stars/alexnita3/jka-discord-bot.svg?style=flat-square
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png