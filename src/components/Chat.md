`Chat` contains the entire chat window functionality.

```js
<Chat pizza="🍕">
  <Message authorName="Jack" avatarUrl="https://randomuser.me/api/portraits/lego/2.jpg" isOwn={false} >
    <MessageText>Here?</MessageText>
  </Message>
  <Message authorName="Joe" avatarUrl="https://randomuser.me/api/portraits/lego/6.jpg" isOwn={true} >
    <MessageText>Whats up?</MessageText>
  </Message>
  <MessageGroup authorName="Jack" avatarUrl="https://randomuser.me/api/portraits/lego/2.jpg" isOwn={false}>
    <Message>
      <MessageText>All good man!</MessageText>
    </Message>
    <Message>
      <MessageText>Check out my latest recipe:</MessageText>
    </Message>
    <Message>
      <MessageTitle title="Ribs are amazing!" subtitle="get the recipe while you can..." />
      <MessageMedia>
        <img src="https://search.chow.com/thumbnail/1280/800/www.chowstatic.com/assets/2014/09/30741_easy_bbq_baby_back_ribs_3000x2000.jpg" />
      </MessageMedia>
    </Message>
    <Message>
      <MessageText>🤤</MessageText>
    </Message>
  </MessageGroup>
</Chat>
```
