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

        this.scene.add(this.ship);
        this.scene.add(this.starfield);
    }

    update(deltaTime: number): void 
    {
        this.ship.lookAt(this.mousePosition);
        this.ship.translateY(0.005);        
    }

    onMouseMove(event: MouseEvent): void
    {
        this.mousePosition.copy(this.getNormalizedDeviceCoordinates(event.x, event.y));
    }
}