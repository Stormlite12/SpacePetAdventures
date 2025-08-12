"use client";
import { useEffect } from "react";
import Phaser from "phaser";
import { useRouter } from "next/navigation";



export default function PlanetSelector() {
  const router = useRouter();

        

  useEffect(() => {
    class PlanetSelectorScene extends Phaser.Scene {
      constructor() {
        super({ key: "PlanetSelectorScene" });
      }

      preload() {
        // Mars image
        this.load.image("mars", "/backgrounds/marsimg.png");

       
      }

      create() {
        const mars = this.add.image(300, 200, "mars").setInteractive();

        // Hover effects
        mars.on("pointerover", () => {
          this.tweens.add({
            targets: mars,
            scale: 1.1, // 10% bigger
            duration: 200,
            ease: "Power1",
          });
        });

        mars.on("pointerout", () => {
          this.tweens.add({
            targets: mars,
            scale: 1, // back to original
            duration: 200,
            ease: "Power1",
          });
        });

        // Click event
        mars.on("pointerdown", () => {
          alert("next to be made!");
          // router.push("/mission/mars");
        });

        // Pixel-art text
        this.add.text(260, 300, "Mars", {
        fontFamily: "VT323, monospace",
        fontSize: '32px',
        color: '#ffffff',
        });

        // Slow spin
        this.tweens.add({
          targets: mars,
          angle: 360,
          duration: 30000,
          repeat: -1,
        });
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 600,
      height: 400,
      transparent: true,
      parent: "planet-selector-container",
      scene: [PlanetSelectorScene],
    };

    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  }, [router]);

  return <div id="planet-selector-container" />;
}
