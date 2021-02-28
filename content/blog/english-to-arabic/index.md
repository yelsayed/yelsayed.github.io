---
title: "Translating your Front-End to Arabic"
date: "2016-08-12T23:14:42.063Z"
description: "Note: I wrote another post with a better method for translating your front end to Arabic, you might want to check it out. Whilst working in Meddy, I had the privilege to be part of transforming the…"
---
Note: I wrote another [post](https://link.medium.com/w7YkFct1OV) with a better method for translating your front end to Arabic, you might want to check it out.

Whilst working in [Meddy](http://meddy.co), I had the privilege to be part of transforming the website from English to Arabic. This blog talk about the transformation the front-end has to go through in order to accommodate an already existing bilingual back end; that being said, I’m targeting a more technical audience in this blog.

Styling a bilingual website can prove to be quite a hassle to develop and debug. It becomes even more of a hassle when one of the two languages requires you to write the language from right to left rather than left to right. In Meddy’s case, it was developed from the very beginning as an English website, and due to demand and user input it was obvious that it was time for the website to move to Arabic, given an already existing left-to-right (ltr) based CSS code.

Now before we get our fingers tapping on a keyboard mindlessly as we try to impress our senior developers (if you aren’t one then high-five) , we must first identify the problems we face with a right-to-left (rtl) front end. If you’re using a CSS framework such as Bootstrap, it does not account for rtl websites. Which means if you intend on using the same framework then you must flip the direction of all the components that are provided by Bootstrap; if we want to make an Arabic version of .col-xs-pull-\* class then we must change the following:

To:

Thankfully, everything that matters was already flipped for us by a lovely person with the name of [Morteza Ansarinia](http://github.com/morteza) which provides us with a library called [bootstrap-rtl](https://github.com/morteza/bootstrap-rtl). If you’re using a custom framework that does not allow for community aided improvements you might want to go through the bootstrap-rtl repo and follow Morteza’s example, it’s really not that complicated. Once you add this library you’ll notice the difference in the structure of your website right away. Just be certain to inject this code only if the Arabic language is selected.

However you’ll still notice that some of your own components are bugging out and do not look like the provided design. This is because your own components are not accounting for the change in direction, for example if you have a border-left, you might want to change it to border-right to accommodate for the design changes.

One thing I mentioned earlier that this is wasn’t initially developed as an Arabic website, which means that there is pre-existing CSS code that defines the look and feel of the website. The first thought that comes to mind when wanting to fix specific problems like the shadow problem mentioned previously: is to overwrite the English CSS code with Arabic CSS code. So it would look something like this:

While this is a valid solution, having multiple files slows down production, is hard to keep track of when you have to add 30–50 new Arabic files (depending on the size of your code base), and it’s not apt for creating Arabic specific components or, for instance, defining Arabic specific fonts. Therefore, the solution mentioned above could put you in more trouble as your code base grows in size.

![SASS logo](./1*dMNikHR10Nfw1Z0PtmITXA.png)

To solve this in a more proper way, I introduced Meddy to SASS, which is a tool that allows for writing dynamic/program-like CSS code. SASS also has something called SCSS which is exactly the same as SASS except it has semicolons and curly brackets. I chose SCSS because not only are curly brackets cool but SCSS is a subset of CSS i.e. you can take all your CSS code and add the extension .scss and nothing changes in it will produce the same result; now, however, you can add SCSS specific functionalities such as Nesting, Inheritance, and Mixins. The thing that we’ll be using for this specific problem is the importation functionality of SASS. This is great because now we can implement a structure to our code; in addition, we don’t have to worry about keeping track of what Arabic code matches what English code, and how it will be overwritten. Let’s take a look at an example that is very close to Meddy’s structure but with no cigar.

```
sass/   
|   
|– base/   
|   |– variables.scss        # Variables   
|   |– base.scss             # Base  
|   |– fonts.scss            # Importing all arabic/english fonts  
|       ...                  # Etc…  
|  
|- components/  
|   |- arabic/  
|       |- buttons.scss      # Different Button components  
|       |- cards.scss        # We love cards in meddy   
|       |- navbar.scss       # Different Navbar components  
|           ...              # Etc…  
|  
|– pages/   
|   |– arabic/  
|       |– index.scss        # Index specific styles   
|       |– profile.scss      # Profile specific styles   
|          ...               # Etc…   
|   |– english/  
|       |– index.scss        # Index specific styles   
|       |– profile.scss      # Profile specific styles   
|           ...              # Etc…  
|  
|– vendors/  
|   |– bootstrap.scss        # Import Bootstrap   
|   |– jquery-ui.scss        # Import jQuery UI   
|       ...                  # Etc…   
|   
|   
|– main.scss                 # Primary English style  
|– main-arabic.scss          # Primary Arabic style
```

In this structure every Arabic file is importing from the English files to overwrite pre-written ltr based code, and accommodate for rtl code. The main files just import all the code in base, components, pages, and vendors based on the language. This way you have a nice system of organising what code comes first, and you can serve only one file when you go to production!

Let’s take a look at the first line in the arabic/index.scss file:

Every file in the pages/arabic/\* and the components/arabic/\* has this line in the beginning of the code. With this, whatever code is written after the line will overwrite any unwanted English code. As mentioned above, this increases the leniency in keeping track of the Arabic file because every Arabic file is now connected to an English counter-part.

Please be aware that this a structure that I conjured up with the help of [John Long](http://thesassway.com/beginner/how-to-structure-a-sass-project) but is open to criticism from anyone reading this.

> Leave your questions in the response section below. I’ll see you soon.