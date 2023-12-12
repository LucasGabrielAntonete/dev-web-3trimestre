//import { defineStore } from 'pinia';
//import userService from '@/services/userApi';
//import { useRouter } from 'vue-router';
//const router = useRouter();
//import { useStorage } from '@vueuse/core';

//export const useUserStore = defineStore('user', {
 //   state: () => ({
  //      loggedIn: null,
    //    userData: useStorage('userData', []),
      //  history: [],
        //chats: [],
       // chatHistory: [],
       // favorites: [],
    //}),
   // actions: {
    //    async login(email, password) {
     //       try {
      //          const data = await userService.loginUser(email, password);
       //         this.loggedIn = true;
        ///        this.userData = data;
          //      router.push({ name: 'dashboard' })
          //  } catch (error) {
          //      console.log(error)
           // }
       // },
       // async register(email, password, name) {
        //    try {
         //       const data = await userService.registerUser(email, password, name);
          //      this.loggedIn = true;
           //     this.userData = data;
         //   } catch (error) {
          //      console.log(error)
           // }
        //},
       // logout() {
        //    try {
         //       this.loggedIn = null;
           //     this.userData = [];
           // } catch (error) {
             //   console.log(error)
           // }
       // },
       // async getHistory() {
        //    try {
         //       const data = await userService.getHistory(1);
          //      this.history = data;
           // } catch (error) {
            //    console.log(error)
           // }
       // }
   // },
// })