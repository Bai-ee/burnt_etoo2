Pts.namespace( window );

var synth;
var sound;

document.addEventListener("DOMContentLoaded", () => {
    initVisualizer();
});

function initVisualizer(){
    space = new CanvasSpace( "#canvas");
    form = new CanvasForm(space);
    space.background = "transparent";

    let index = new Pt(-1,-1);
    synth = new Tone.Synth();
    sound = Sound.from( synth, synth.context ).analyze(128);
    synth.toMaster(); // play using tone.js instead of Pts

    space.add({
        animate: (time) => {
             if (synth.context.state === 'suspended') { // mostly for safari
                 form.fillOnly("#fff").text( [20, 30], "Click anywhere to start" );
             }

             let area = space.size.$divide( 3 );
             let idx = space.pointer.$divide( area ).floor();
             let rect = [idx.$multiply(area), idx.$multiply(area).add(area)];

             let t1 = sound.timeDomainTo( area, rect[0].$subtract(0, area.y/2) );
             let t2 = t1.map( t => t.$add(0, area.y) ).reverse();
             let freqs = sound.freqDomainTo( [area.x, area.y/2], [rect[0].x, 0] ).map( f => [[f.x, rect[0].y+area.y/2-f.y], [f.x, rect[0].y+area.y/2+f.y]] );

             form.fillOnly("#fe3").polygon( t1.concat(t2) );
             form.strokeOnly("#62e", Math.ceil(area.x/128) ).lines( freqs );

             let key = ["C3", "E3", "G3", "C4", "E4", "G4", "C5", "E5", "G5"][ idx.y*3+idx.x ];
             form.font(120, 'bold').fillOnly("#fff").text( rect[0].$add( 10, 110 ), key );

             if (!index.equals(idx)) { // play if on different area
                 synth.triggerAttackRelease( key, '4n');
                 index = idx;
             }
         },

        action: (type, x, y) => {

        }
    });
}

function startVisualizer() {
    if(!space.isPlaying){
        space.replay();
    }else{
        space.stop();
    }
};

