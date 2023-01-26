/* Lecture 4
 * CSCI 4611, Spring 2023, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class SpaceMinesweeper extends gfx.GfxApp
{
    // The graphics primitives that define objects in the scene
    private ship: gfx.Rectangle;
    private star: gfx.Rectangle;
    private mine: gfx.Rectangle;

    // The stars will be drawn using a 2D particle system
    private starfield: gfx.Particles2;

    private mousePosition: gfx.Vector2;

    constructor()
    {
        // The first line of any child class constructor must call
        // the base class's constructor using the super() method. 
        super();

        this.ship = new gfx.Rectangle();
        this.star = new gfx.Rectangle();
        this.mine = new gfx.Rectangle();

        this.starfield = new gfx.Particles2(this.star, 200);

        this.mousePosition = new gfx.Vector2();

        this.renderer.viewport = gfx.Viewport.CROP;
    }

    createScene(): void 
    {
        // Load the ship texture to make the object a sprite, then scale it 
        // to an appropriate size.
        this.ship.material.texture = new gfx.Texture('./ship.png');
        this.ship.scale.set(0.08, 0.08);

        this.star.material.texture = new gfx.Texture('./star.png');

        for(let i=0; i < this.starfield.numParticles; i++)
        {
            this.starfield.particleSizes[i] = Math.random()*0.008 + 0.002;
            this.starfield.particlePositions[i].set(Math.random()*2-1, Math.random()*2-1);
        }

        this.starfield.update(true, true);

        this.mine.material.texture = new gfx.Texture('./mine.png');
        this.mine.scale.set(0.12, 0.12);

        this.scene.add(this.starfield);
        this.scene.add(this.mine);
        this.scene.add(this.ship);
        
        
    }

    update(deltaTime: number): void 
    {
        // These parameters define the motions of objects in the scene,
        // which you will use to complete the code for this assignment.
        // You can feel free to modify them if you want your game
        // to have a different feel from the instructor's implementation.
        // Note that all speed variables are scaled by deltaTime.
        // This is important to make sure that the game plays similarly
        // on different devices regardless of the framerate.
        const shipSpeed = 0.8 * deltaTime;
        
        this.ship.lookAt(this.mousePosition);

        if(this.ship.position.distanceTo(this.mousePosition) > 0.02)
            this.ship.translateY(shipSpeed);        
    }

    onMouseMove(event: MouseEvent): void
    {
        this.mousePosition.copy(this.getNormalizedDeviceCoordinates(event.x, event.y));
    }
}