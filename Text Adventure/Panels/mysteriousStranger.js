panelMakes['StrangerOne'] = StrangerOne

function StrangerOne() {

  return {
    id: 'StrangerOne',
    myMaker: GoblinMath,
    mediaData: {
      type: "Image"
      src: "Images/Goblin.jpg",
      size: '100%', // Scale the image
      offsetX: '-50%', // Horizontal offset
      offsetY: '-50%' // Vertical offset
    },
    onLoad: () => {
      startCountdown(4,"timer",() => { 
        me.options = me.options.filter(item => item.id !== "Attack");
        goPanel(me);
      });
    },
    text: "Quick, what's 27 x 12?",
    options: [
      {
            text: "Attack quickly while his back is turned! <div id='timer' style = 'color: red;'>10s</div>",
            id: "Attack",
            action: () => {
              takeDamage(5)
              goPanel("Goblin Punch")
              panels = {};
              queuePanel('Start', 1800)
            },
      },
      {
            text: 'Something Else',
            action: () => {
              gainGold(324)
              goPanel("Goblin Gold")
              queuePanel('Goblin Shop One', 1800)
            }
      }
    ]
  }
}
