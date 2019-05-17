/**
 * Created by win7 on 2018/11/15.
 */
import reducer from '../reduers/'
import {createStore} from 'redux'

export default function configStore(initailState) {
  const store=createStore(reducer,initailState)
    return store
}