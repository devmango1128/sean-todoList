import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export const useToast = (movePage) => {
    
    //Toast
    const toastMessage = ref('')
    const toastAlertType = ref('')
    const showToast = ref(false)
    const timeout = ref(null)
    const router = useRouter()

    //Toast로 알림 표시
    const triggerToast = (message, type = 'success') => {
  
      toastMessage.value = message
      showToast.value = true
      toastAlertType.value = type;

      //timeout.value에 setTimeout을 넣어준다.
      timeout.value = setTimeout(()=> {

      toastMessage.value = ''
      toastAlertType.value = ''
      showToast.value = false

      if(movePage) {
        router.push({
            name: 'Todos'
        })
      }

      }, 3000)
    }

    //메모리 누수를 막기 위해 페이지 이동 시 toast settimeout을 clear 해준다.
    //Unmounted는 메모리 정리 할 때 유용하게 사용
    onUnmounted(() => {
        clearTimeout(timeout.value)
    })

    return {
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast
    }
}