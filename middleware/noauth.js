export default function ({ store, redirect }) {
  if (store.getters['auth/isAuth']) {
    return redirect('/')
    // if (store.getters['auth/isOperator']) {
    //   return redirect('/hotels')
    // } else {
    // }
  }
}
