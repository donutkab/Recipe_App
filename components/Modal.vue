<template>
        <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" >Edit</v-btn>
      </template>
      <v-card :id="id">
           <p>Id :</p>
         <v-text-field v-model="ID" id="id" label="Enter Id"></v-text-field> 
          <p>Smoothie Title :</p>
          <v-text-field v-model="title" label="Enter Smoothies Title"></v-text-field>       
        <p>Add an Ingredient :</p>
          <v-text-field v-model="description" label="Enter Ingredient Description"></v-text-field> 
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue" text @click="editFromFirestore(ID)">Confirm Edit</v-btn>
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
        async editFromFirestore(Idnum){

       const ref = fireDb.collection("test").doc(Idnum)
        const document ={
          id:Idnum,
          title: this.title,
          description: this.description

        }
        try {
          await ref.set(document);

           this.$router.push('/')
        } catch (e) {
          // TODO: error handling
          console.error(e)
        }

}
    }
}
</script>