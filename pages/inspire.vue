<template>
  <div class="contianer">


  <v-row>
 
  <v-col v-for="item in data " :key="item.id" ><v-card >
     <v-card-title>{{item.id}}</v-card-title>
      <v-card-subtitle>{{item.title}}</v-card-subtitle>
      <v-card-text>{{item.description}}</v-card-text> 
      <!-- <v-btn @click="deleteFromFirestore(item.id)">Delete</v-btn> -->
      <!-- <v-btn @click="editFromFirestore(item.id)">Edit</v-btn> -->
      <Del :ID=item.id />
      <Modal :ID=item.id />
            
</v-card>


 
  </v-col>

  </v-row>



    <v-card >
   
      
      <v-card-title class="orange--text text">Add New Smoothie Recipe</v-card-title>
      <v-form>
        
        <p>Id :</p>
         <v-text-field v-model="id" id="id" label="Enter Id"></v-text-field> 
          <p>Smoothie Title :</p>
          <v-text-field v-model="title" label="Enter Smoothies Title"></v-text-field>       
        <p>Add an Ingredient :</p>
          <v-text-field v-model="description" label="Enter Ingredient"></v-text-field> 
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div>
        <v-btn center @click.stop="saveBook" color="#FF1493"   class="align-self-center">Add SMOOTHIE</v-btn>
            <!-- <v-btn @click="editFromFirestore(id)" color="green">Edit</v-btn> -->
            </div>
      </v-card-actions>
    </v-card>

  </div>
</template>
<script>
import {fireDb} from '~/plugins/firebase.js'
import Modal from '@/components/Modal'
import Del from '@/components/DelModal'
export default {
  components:{
    Modal,
    Del
  },
  data(){
    return{
      id:null,
      title:"",
      description:"",
      data:[],
       dialog: false,
    }
  },
  created(){
// this.readFromFirestore()
  },
  mounted(){
   this.readFromFirestore(),
   this.deleteFromFirestore(),
   this.editFromFirestore()
  },
  methods:{
    async saveBook(){
   
        const ref = fireDb.collection("test").doc(this.id)
        const document ={
          id:this.id,
          title: this.title,
          description: this.description

        }
        try {
          await ref.set(document, { merge: true });
           this.readFromFirestore(this.id)
        } catch (e) {
          // TODO: error handling
          console.error(e)
        }
      
      

    },
    async readFromFirestore() {
  // const ref = fireDb.collection("test").doc(id)
 
  // let snap
  // try {
  //   snap = await ref.get()
  // } catch (e) {
  //   // TODO: error handling
  //   console.error(e)
  // }
  // this.data = snap.data()

  // this.readSuccessful = true

  //  const events = await fireDb.collection('test').get()
  //   .then(querySnapshot => {
  //     querySnapshot.docs.map(doc => {
  //        console.log('LOG 1', doc.data());
  //       return doc.data();
  //     });
  
  //   });
  // console.log('LOG 2', events);
  
  // console.log("DADADADADA",this.data)

  // return events;

     const snapshot = await fireDb.collection('test').get()
     this.data=snapshot.docs.map(doc => doc.data())
    return snapshot.docs.map(doc => doc.data())
},

async deleteFromFirestore(Idnum){

await fireDb.collection("test").doc(Idnum).delete().then(function() {
    console.log("Document successfully deleted!");
      this.$router.push('/')
  this.readFromFirestore()
  

}).catch(function(error) {
    console.error("Error removing document: ", error);
});

},


async editFromFirestore(Idnum){

       const ref = fireDb.collection("test").doc(Idnum)
        const document ={
          id:Idnum,
          title: this.title,
          description: this.description

        }
        try {
          await ref.set(document);
           this.readFromFirestore(Idnum)
        } catch (e) {
          // TODO: error handling
          console.error(e)
        }

}


  }
}


</script>

