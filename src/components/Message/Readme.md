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
  <MessageText>Look! it even detects links like this - https://developerzen.com - and email addresses` like this@gmail.com</MessageText>
</Message>
<Message authorName="Jack" avatarUrl="https://randomuser.me/api/portraits/lego/2.jpg" isOwn={false} >
  <MessageMedia title="New Hires" subtitle="Meet our new hires!">
    <img src="https://images.unsplash.com/photo-1525422847952-7f91db09a364" />
  </MessageMedia>
  <MessageItems>
    <MessageItem title="Annie Alexander" subtitle="Hello, I am new at this company" image="https://randomuser.me/api/portraits/women/28.jpg" />
    <MessageItem title="Bryan White" buttonUrl="" buttonText="Read More" subtitle="I have been here since the beginning! I am a very cool guy! I like stuff!" image="https://randomuser.me/api/portraits/men/28.jpg" />
    <MessageItem title="Shady Dude" subtitle="I dont have an image at all. No one knows who I am, but I have the longest bio for some odd reason. Maybe I want another line of text, who knows?" />
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
