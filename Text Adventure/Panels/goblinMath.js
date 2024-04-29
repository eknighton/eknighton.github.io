panelMakes['Goblin Math'] = GoblinMath
function GoblinMath() {
  let ret = {
    id: 'Goblin Math',
    self: null,
    myMaker: GoblinMath,
    mediaData: {
      src: "Images/Goblin.jpg",
      size: '100%', // Scale the image
      offsetX: '-50%', // Horizontal offset
      offsetY: '-50%' // Vertical offset
    },
    onLoad: () => {
      startCountdown(7,"timer",() => { 
        panels = {};
        let temp = GoblinPunch()
        temp.text = "Too slow!"
        goPanel(temp);
        queuePanel("Start", 2000)}
      );
    },
    text: "Quick, what's 27 x 12? <div id='timer' style = 'color: red;'>10s</div>",
    options: [
      {
            text: "An equation",
            action: () => {
              takeDamage(5)
              player.HP = 0;
              goPanel("Goblin Punch")
              panels = {};
              queuePanel('Start', 1800)
            },
      },
      {
            text: '324',
            action: () => {
              gainGold(324)
              goPanel("Goblin Gold")
              queuePanel('Goblin Shop One', 1800)
            }
      }
    ]
  }
  ret.self = ret;
  return ret;
}

panelMakes["Goblin Punch"] = GoblinPunch;
function GoblinPunch(){
  let ret = {
      id: 'Goblin Punch',
      mediaData: {
        src: "Images/KnightSlays.gif",
        size: '100%', // Scale the image
        offsetX: '-50%', // Horizontal offset
        offsetY: '-50%' // Vertical offset
      },
      onLoad: null,
      text: "No! It's an expression! <b>There's no equals sign!</b>",
      options: [
      ]
  };
  ret.self = ret;
  return ret;
}

panelMakes["Goblin Gold"] = GoblinGold
function GoblinGold(){
  let ret = {
      id: 'Goblin Gold',
      mediaData: {
        src: "Images/GoldAdobe.jpeg",
        size: '100%', // Scale the image
        offsetX: '-50%', // Negative is left
        offsetY: '-40%' // Negative is up
      },
      onLoad: null,
      text: "The goblin gives you 324 gold...",
      options: [
      ]
  };
  ret.self = ret;
  return ret;
}
