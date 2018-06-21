Example 1:

```js
<Message authorName="Jack" avatarUrl="https://randomuser.me/api/portraits/lego/2.jpg" isOwn={false} >
  <MessageText>Here?</MessageText>
</Message>
<Message authorName="Joe" avatarUrl="https://randomuser.me/api/portraits/lego/6.jpg" isOwn={true} >
  <MessageText>Whats up?</MessageText>
</Message>
<Message authorName="Jack" avatarUrl="https://randomuser.me/api/portraits/lego/2.jpg" isOwn={false} >
  <MessageText>All good man! 😂</MessageText>
</Message>
<Message authorName="Joe" avatarUrl="https://randomuser.me/api/portraits/lego/6.jpg" isOwn={true} >
  <MessageText>Look! it even detects links like this - https://developerzen.com - and email emails like this@gmail.com</MessageText>
</Message>
<Message authorName="Jack" avatarUrl="https://randomuser.me/api/portraits/lego/2.jpg" isOwn={false} >
  <MessageItems>
    <MessageItem title="Vegetables" subtitle="From the farm to your fork this that and something else" image="http://via.placeholder.com/250x250" />
    <MessageItem title="Fruits" subtitle="Our selection is the largest" image="http://via.placeholder.com/250x250" />
  </MessageItems>
</Message>
```


With typing indicator:

```js
<Message authorName="Jack" avatarUrl="https://randomuser.me/api/portraits/lego/2.jpg" isOwn={false} >
  <TypingIndicator />
</Message>
```

With Media:

```js
<Message>
  <MessageTitle title="Ribs are amazing!" subtitle="Get the recipe while you can..." />
  <MessageMedia>
    <img src="https://search.chow.com/thumbnail/1280/800/www.chowstatic.com/assets/2014/09/30741_easy_bbq_baby_back_ribs_3000x2000.jpg" />
  </MessageMedia>
  <MessageButtons>
    <MessageButton label="Go to recipe..." primary />
    <MessageButton label="More" />
  </MessageButtons>
</Message>
```
