<template>
        <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="red" dark v-on="on" >Delete</v-btn>
      </template>
      <v-card :id="id">
           <p>Id :</p>
         <v-text-field v-model="ID" id="id" label="Enter Id"></v-text-field> 
          <!-- <p>Smoothie Title :</p>
          <v-text-field v-model="title" label="Enter Smoothies Title"></v-text-field>       
        <p>Add an Ingredient :</p>
          <v-text-field v-model="description" label="Enter Ingredient Description"></v-text-field>  -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="red" text @click="deleteFromFirestore(ID)">Confirm Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>
<script>
import {fireDb} from '~/plugins/firebase.js'
export default {
  props:['ID'],
    data(){
        return{
          id:null,
      title:"",
      description:"",
      data:[],
       dialog: false,
        }
    },
    methods:{
       async deleteFromFirestore(Idnum){

await fireDb.collection("test").doc(Idnum).delete().then(function() {
    console.log("Document successfully deleted!");
     

  

}).catch(function(error) {
    console.error("Error removing document: ", error);
});
 this.$router.push('/')

},
    }
}
</script>