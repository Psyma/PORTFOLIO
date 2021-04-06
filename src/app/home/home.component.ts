import { Component, OnInit } from '@angular/core';
import { SharedVariables } from '../Utils/SharedVariables';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor() { }
    about_me_caption1: string = ""
    about_me_caption2: string = ""
    projects: any = [];
    ngOnInit(): void {
        SharedVariables.app_title = "portfolio";

        this.about_me_caption1 = `My name is Rickben Anthony Q. Gimeda, I started my programming career in 2018, Which was during my
                                second
                                year in the Bachelor of Science in Computer Engineering program. I struggle a lot in programming
                                courses
                                but
                                soon enough I started to like it, like how much I can do in the programming field. Then soon after I
                                decided
                                to take the path of being a programmer.`
        this.about_me_caption2 = `I have made a couple of projects written in C++ and C# as part of my practice, I have studied more
                                about
                                Object-Oriented Programming and Data structure and Algorithms. My latest creation is the website
                                itself.
                                As
                                part of my goal, I'm currently working to make myself a fine developer hoping to get my dream job as
                                a
                                software engineer soon.`
        this.projects.push({
            title: "Puzzle Game (C# WPF)",
            src: "../../assets/images/puzzleThumbNail.png",
            caption: `The Puzzle Game is the last C# project I created. It was during
                    the
                    early lockdown of March 2020, due to boredom I decided to create this. The game is the same as a
                    typical
                    puzzle game. You will just need to put everything in order for you to win.`,
            link: "https://github.com/PSYMA/Puzzle-Game-CSharp-WPF"
        });
        this.projects.push({
            title: "Tic Tac Toe (C# WPF)",
            src: "../../assets/images/matchThumbNail.png",
            caption: `This Tic Tac Toe Game is my prelim project during my C# language
                    course
                    in college, this is not your traditional tic tac toe game, the game itself has more features and
                    is
                    way
                    more graphical, The rules are the same.`,
            link: "https://github.com/PSYMA/TIC-TAC-TOE-CSharp-WPF"
        });
        this.projects.push({
            title: "The Matching Game (C# WPF)",
            src: "../../assets/images/matchThumbNail.png",
            caption: `This Matching Game is my midterm project during my C# language
                    course
                    in
                    college, the game works by pairing its cell to the other cell, make mistakes and it will reduce
                    your
                    HP
                    when HP goes to zero you lose.`,
            link: "https://github.com/PSYMA/The-Matching-Game-CSharp-WPF-"
        });
        this.projects.push({
            title: "The Hidden Battle Game (C# WPF)",
            src: "../../assets/images/battleThumbNail.png",
            caption: `This Hidden Battle Game is my final project during my C# language
                    course
                    in college,
                    this is the most challenging project I
                    created in C# so far took me a lot of time to finished. The game is derived from this board game`,
            link: "https://github.com/PSYMA/The-Hidden-Game-Battle-CSharp-WPF-",
            yt: "https://www.youtube.com/watch?v=4gHJlYLomrs"
        });
        this.projects.push({
            title: "The Pong Game (C++)",
            src: "../../assets/images/pongThumnail.png",
            caption: `This is one of my very first projects back in my early days in
                    programming C language, in particular, The is game quite simple all you need to do is to control
                    the
                    paddle and catch the ball, make sure to catch the ball otherwise you will lose. clear all-stars
                    and
                    you
                    win.`,
            link: "https://github.com/PSYMA/Library-System-simple-C-Cpp-Console"
        });
        this.projects.push({
            title: "Simple Library System (C++)",
            src: "../../assets/images/cppLibraryThumbnail.png",
            caption: `This Simple Library System is my final project during my C
                    language
                    course. I struggle a lot during my creation of this project, I am still a newbie at that time.
                    The
                    project is quite easy: student borrow books as well return it.`,
            link: "https://github.com/PSYMA/Library-System-simple-C-Cpp-Console"
        });
        this.projects.push({
            title: "Library System (SQLite integrated C# WPF)",
            src: "../../assets/images/csLibraryThumbNail.png",
            caption: `This Library System is the upgraded version of my Simple Library
                    System
                    in C++, it's integrated with SQLite and offers a couple of features and it's graphical and user
                    friendly. I decided to create this project to expose myself to a database project.`,
            link: "https://github.com/PSYMA/Library-System-CSharp-WPF"
        });
    }
}
