# Project 4: The Frogger (An Arcade Game)
##### *An Udacity FEND Nanodegree Course Project*

## Overview

This is project 4 of the Udacity FEND Nanodegree course. The project is essential to understand the concept of Object Oriented Programming in Javascript. The title of the project is called a simple Arcade Game.


## Setup

Some of the files have been given by the Udacity Course planning team. To load the game, the html file (index.html) could be loaded on the browser of your choice. I have edited some of the files accordingly. For example, I have adjusted the app.js file, css file, engine and the images files respectively.

## How To Play

##### Overview & Control

Once the game is loaded,the character is controlled by the player using the keyboard arrow keys (←, ↑, →, ↓) or alternatively (A, W, D, S). Enemies appeared in the form of a bug. The mission is mainly to avoid the bug and move over to the green pavement for safety. The player automatically returns to the starting point as defined during the instantiations and devlopment. 

Player is supplied with 3 stars at the begining. This is the life expectancy. Player's remaining hearts (life) will be shown. And on the bottom left, current score. 

Play again button resets the game. Various information are displayed to show the progress and in case the game is over.

##### Goal

The goal is to avoid the enemy and safely cross to the topmost place on the canvas.
Any collision with the bug returns the player backs to the starting position.
Once the player crossed successfully, the player will receive points to the overall score. 

##### Score Cards

The scoring system is based on player's moves to sucessfully cross. It is dfined as such:

* 5 moves (minimum to cross) = 200 points
* 6 moves = 190 points
* 7 moves = 180 points
* ... 
* 10+ moves = 100 points (minimum amount of points awarded for successful cross)


##### Penalties

On collision with the bugs, the player returns to the starting position. When the collsion occurs three times (3x) the game ends. Modal appears at intervals to communicate with the player to restart the game and try again. 


## Technology

* JavaScript (ES6)
* CSS 3
* HTML 5
* Resources and Engine supplied by the Udacity team


## Credits

* Core project files (engine and resources) provided by Udacity

## Open Source.
The project will be uloaded to GitHub once it has been approved by the Udacity Reviewer and professionals can contribute freely on Github.

## Future Functionalities to add
*Timer to make it more interesting
*Rewards for the point gain. That is, the ability to gain more life(starts) based on the points achieved.

## Conclusion
Thanks for contributing.




