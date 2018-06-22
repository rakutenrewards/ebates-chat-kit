News Example:

```js
<Message authorName="Joe" avatarUrl="https://randomuser.me/api/portraits/lego/6.jpg" isOwn={true} >
  <MessageText>Show me the news</MessageText>
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