import { createStore } from 'vuex'
import getApi from '../Api'

export default createStore({
  state: {
    data: [],
    trashData: []
    
  },
  getters: {
    notes: (state) => state.data,
    trashData : (state) => state.trashData
  },
  mutations: {
    populateNotes (state, notes) {
      console.log("working")
      state.data = notes
    },
    removeNote (state, id) {
    state.data = state.data.filter(todo => todo.id !== id)
    },
    addNote(state,note) {
    
     state.data.push(note)

    },
    updateNote(state,note) {
      let oldNote = state.data.findIndex(notes => notes.id == note.id )
      console.log(oldNote) 

    },
    populateTrashNotes (state, notes) {
      console.log("working")
      state.trashData = notes
    },
    restoreNote(state, id){
      state.trashData = state.trashData.filter(todo => todo.id !== id)

    },
    deleteTrashNote(state, id){
      state.trashData = state.trashData.filter(todo => todo.id !== id)

    }
  },
  actions: {
    async getNotes ({commit}) {
      await getApi.get('api/').then((response) => {
        console.log("api working",response.data)
        commit('populateNotes', response.data)})
    },
    async deleteNote ({commit},id) {
      console.log(id)
      await getApi.put('deletenote',{'id':id}).then(() => {
       commit('removeNote', id) 
      })
    },
    async postNote({commit,state},newNote) {
      console.log(newNote,state.data,'here')
      let note = {title:newNote.title,body:newNote.body}
      if(state.data.length >  0) {
       let len = state.data.length 
       let lastId = state.data[len-1]
       console.log(lastId.id,len)
       note.id = Number(lastId.id )+ 1
 
      }
      else{
        note.id = 1
      }
      getApi.post('addnote', note).then((response) => {
        console.log(response)
        commit('addNote',note)
    
      })

    },
    async updateNote({commit},updatednote) {
      // let note = {id:id, updatednote:updatednote} 
      console.log(updatednote)
      let note = updatednote
     await getApi.put('updatenote', note).then((response) => { 
        console.log(response)
        commit('updateNote',note)
        window.location.reload()
      
      })
    },
    async getTrashNotes({commit}){
      await getApi.get('trashnotes').then((response) => {
        console.log("api trash working",response.data)

        commit('populateTrashNotes', response.data)})
    },
    async restore({commit},id){
      await getApi.put('restore',{id:id}).then((response) => { 
        console.log(response)
        commit('restoreNote',id)
        window.location.reload()
      
      })

    },
    async deleteTrash({commit},id){
      await getApi.put('deletetrashnote',{'id':id}).then(() => {
        commit('deleteTrashNote', id) 
       })
    }
  },
  modules: {
  }
})
