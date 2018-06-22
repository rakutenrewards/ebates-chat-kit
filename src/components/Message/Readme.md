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
  <MessageMedia title="Top News" subtitle="Lots of very important things happened">
    <img src="https://images.unsplash.com/photo-1453945619913-79ec89a82c51" />
  </MessageMedia>
  <MessageItems>
    <MessageItem title="Man Saves Cat" subtitle="A cat was rescued by a man after being stuck in a tree for 3 hours" image="https://randomuser.me/api/portraits/men/28.jpg" />
    <MessageItem title="Woman Saves Man Saving Cat" buttonUrl="" buttonText="Read More" subtitle="A woman rescued a man and a cat who were stuck in a tree for 6 hours." image="https://randomuser.me/api/portraits/women/28.jpg" />
    <MessageItem title="Where are our city's firefighters?" subtitle="Several cats have been stuck in trees in the past week and firefighters are no where to be seen. What are they doing? Should the city impose a mandatory training for firefighters?" />
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
