# CIS367

## Overview

This repository houses all programs related to and written in CIS 367, Computer Graphics, taught by Erik Fredericks.

## Accessing Pages

Accessing the browser version of the HTML files within is as easy as typing in `harrmegh.github.io/CIS367/Triangle/triangle.html` in the browser where `Triangle` is a folder that contains the html you are looking to view--`triangle.html` in this case.

The easiest place to start is the landing page `harrmegh.github.io/CIS367`, which gives you access to all homework assignments and the term project.

## Term Project

- The inspiration for this project came from working with 3D models and staging landscapes for AR scenes. As it turns out, doing so is riotous fun and I can stare, with bloodshot eyes, into Blender for all eternity. Also, I yearned for Spring and to see the sun again, so I wanted the scene to reflect that.

### What it is

- At its most basic it is a scenic Spring landscape with animations strung together to form a video. All 8 seconds of it. Truly though, it took me weeks and at least 20 youtube tutorials 😭😵‍💫😵. Speaking of which, I attempted to give credit where credit is due below in the `Sources` section 🥷🏼.
- For a more detailed description of what `it` is, read on.

### Graphics-based technologies

- If it isn't obvious or you skipped the above section, this scene was made using Blender, an open source piece of software badassery. The blend file `spring_scape.blend`, is the source of all meshes, animations, physics components, textures, lighting, camera, and camera rigs.

#### Imported Models

- The easiest portion of this project for me were the models I decided to use as props for my scene: a set of Hayao Miyazaki characters (give me all the Totoros) and an animated butterfly both from [Sketchfab](https://sketchfab.com/feed). Totoro himself served as a large-and-in-charge surface for lots of shadowing to take place while the butterfly added a touch of whimsy.
- In the blend file, these are noted as `totoro` and `monarch`.

#### Everything Else

##### Background and Lighting

- The background is a simple blue sky HDRI I pilfered from [polyhaven](https://polyhaven.com/hdris) and set up while the lighting involves a sun lamp to give the illusion of a sunny day.
- You can find the HDRI in the `global` settings of the blend file and the sun lamp under `Sun`.

##### Landscape

- 🎤 This was the hardest and made me cry 🩸.

###### Ground

- The ground, `ground` in the blend file, came from a youtube tutorial that involved texturing a plane with a multi-colored, grassy-looking png. I used another tutorial to learn how to edit the model and make it hilly. Then, following the first tutorial, I added both a Displace modifier, to give the ground a `disrupted` look, and a ParticleSystem with the Hair property selected.
- This setting is by far the coolest. In addition, I made the radius of each blade bigger, added some randomness and collision, and turned it into a force field. This gives the grass a chaotic, wind-blown look.

###### Tree

- The tree, `fantasy_tree` or `leaves.001` or `treeArm.001` in the blend file, is Frankestein's Creature. I started off using the sapling tree gen. However, I determined the tree itself just didn't work with the rest of my scene. I did like the leaves, so I deleted the trunk and left the leaves and the armature so that I could keep the animation. Hence, the `.001` pieces scattered throughout the blend file.
- The true tree, `fantasy_tree`, is a combination of three different tutorials and I built it in another blend in order to quit messing up the rest of my spring scape. It is basically two meshes, one for the trunk and one for the foliage. The trunk has a base color texture with some displacement added (which unfortunately you don't see because I imported it from one blend to another). The foliage is a texture I pilfered from one of the youtube tutorials free offerings.
- My big failure here is not being able to figure out why either mesh (trunk or foliage), did not respond to physics, specifically wind. Either way, to save some time. I rotated the foliage a little per keyframe (thank you Allen Janyska and Professor Fredericks) to give it the illusion of responding to the wind.

###### Wind and Turbulence

- Both of these were added during the making of `ground`, and can be found under `Wind` and `Turbulence` in the blend file. Wind was ridiculously easy to add, while turbulence just required adding some key frames and a path.

###### Camera, Empty Object, Bezier Circle aka Camera Rig

- Yet another tutorial helped me out with the Camera and Camera Rig.
- Essentially it is a curve, `Bezier Circle` in the blend file, scaled and rotated to circle the scene, that has an empty cube, `Empty`, parented to it. So, the idea is that the empty cube follows the circle as a path and keyframes can be set up to track its movement.
- Then, the camera, `Camera`, is parented to the empty cube and is set to track `Totoro`. This allowed me to only be concerned on the location of the camera along the path, which made working the camera infinitely easier.

### How to use it

- Install Blender and download the `spring_scape.blend` file or play the [mp4](https://harrmegh.github.io/CIS367/Blender/spring_scape.html) if you want the hands-off approach.

### Sources

- This list is by no means exhaustive and I have deviated well and often from the tutorials when I wanted or needed to. All problems are my own, but these peeps helped me the most.

#### Basics

[Blender Guru](https://www.youtube.com/watch?v=nIoXOplUvAw&list=RDCMUCOKHwx1VCdgnxwbjyb9Iu1g&start_radio=1): I 🤍 him for existing, making many consumable tutorials, and having an A+ laugh.

#### Ground

[Rogue_Knight3D](https://www.youtube.com/watch?v=xMwSk-cZaME): gave me the right idea!
[Blender Box](https://www.youtube.com/watch?v=ymGNkqLMrJg): this is what I used the most for the grass, turbulence, and wind.

#### Tree

[CG Geek](https://www.youtube.com/watch?v=y7PdiGXbrD0): for the foliage and ideas for transparency.
[Sardi Pax](https://www.youtube.com/watch?v=4UsNSDYflyU&t=3s): for the sapling gen tutorial and really the leaves!
[PolyRem](https://www.youtube.com/watch?v=dt0JJwwbfwM&t=13s): I desperately tried to make mine as good as this and just...couldn't.

#### Camera and Rig

[Kev Binge](https://www.youtube.com/watch?v=K02hlKyoWNI&t=578s): super easy, follow-along tutorial and with amazing results for a beginner. Thanks from the bottom of my stone heart.
