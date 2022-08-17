import getBasicLayout from "../../components/Layout"
import style from './follow.module.sass'

const UserFollows = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.main}></div>
    </div>
  )
}

UserFollows.getLayout = getBasicLayout

export default UserFollows