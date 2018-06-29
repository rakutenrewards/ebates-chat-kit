`Chat` contains the entire chat window functionality.

```js

<Chat
  ownAuthor={{"name": "Jack", "avatarUrl": "https://randomuser.me/api/portraits/lego/2.jpg"}}
  otherAuthor={{"name": "Joe", "avatarUrl": "https://randomuser.me/api/portraits/lego/6.jpg"}}
  onButtonClick={(l, v) => {alert(`label: ${l}\nvalue: ${v}`)}}
  messages={[
    {
      isOwn: false,
      text: "Here?"
    },
    {
      isOwn: true,
      text: "What's up?"
    },
    {
      isOwn: false,
      text: "All good!"
    },
    {
      isOwn: false,
      text: "Check out my latest recipe:"
    },
    {
      isOwn: false,
      title: "Ribs are amazing!",
      subtitle: "get the recipe while you can...",
      imageUrl: "https://search.chow.com/thumbnail/1280/800/www.chowstatic.com/assets/2014/09/30741_easy_bbq_baby_back_ribs_3000x2000.jpg",
      buttons: [
        {
          label: 'Show Me The Recipe',
          value: 'Here is the recipe'
        }
      ]
    },
    {
      isOwn: true,
      text: "OMG!"
    },
    {
      isOwn: true,
      text: "🤤"
    },
    {
      isOwn: false,
      quickReplies: ["yes", "no", "maybe"]
    }
  ]}
  />
```
