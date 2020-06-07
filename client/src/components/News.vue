<template>
    <v-list flat dark color="#004D40">
        <v-subheader>NEWS</v-subheader>
        <v-list-item-group v-model="news_item" color="primary">
            <v-list-item disabled inactive v-for="(item, i) in news" :key="i">
                <v-list-item-content>
                    <v-card outlined style="margin-bottom: 10px">
                    <v-card-title>{{item.title}}</v-card-title>
                    
                    <v-card-text>
                        <p class="news-date">{{item.course}} - {{item.date}}</p>
                        <p class="news-text">{{item.newsText}}</p>
                        <p class="news-author">{{item.postedBy}}</p>
                    </v-card-text>
                </v-card>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>


        
    </v-list>
</template>

<script>
  export default {
      props: ['news'],
    data: () => ({
      news_item: 1
    })
  }
</script>