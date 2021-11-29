export default function({ store, route, redirect, app }) {
  if (store.getters['auth/isAuth']) {

    let isOperator = app.$cookies.get("isOperator")

    if (route.name.includes('hotels')) {

        if (isOperator) {
          if (!store.getters["auth/isOperator"]) {
            store.commit("auth/SET_OPERATOR_ROLE")
          }
        }

        // if (!store.getters["auth/operatorID"]) {
          let operatorID = app.$cookies.get("operatorID")
          if (operatorID) {
            store.commit("auth/SET_OPERATOR_ID", operatorID)
          }
        // }
      }

    if (isOperator && !route.name.includes('hotels')) {

      if (route.params.id) {
        return redirect(`/hotels/${route.params.id}`)
      } else {
        return redirect("/hotels")
      }
    }

  } else {
    return redirect('/auth')
  }
}