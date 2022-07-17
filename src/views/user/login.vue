
<script lang="ts" setup>
// import { User, Lock, FolderChecked, View } from '@element-plus/icons'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
  import Identify from '@/components/Identify/index.vue'
  import { computed, defineComponent, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/modules/user'
  import { getImageUrl } from '@/assets'
  const bgImg = getImageUrl('login-bg.png')
    const userstore = useUserStore()

      const router = useRouter()
      const passVisible = ref(false)
      const formVm = ref()
      const loading = ref(false)
      const form = reactive({
        username: '',
        password: '',
        code: '',
      })
      const rules = reactive({
        username: {
          required: true,
          message: '用户名不能为空',
          trigger: 'blur',
        },
        password: {
          required: true,
          message: '密码不能为空',
          trigger: 'blur',
        },
        code: {
          required: true,
          message: '验证码不能为空',
          trigger: 'blur',
        },
      })
      const passInputType = computed(() =>
        passVisible.value ? 'text' : 'password',
      )

      // 密码查看切换
      const passVisibleTaggleClick = () => {
        passVisible.value = !passVisible.value
      }

      const submitForm = () => {
        formVm.value.validate((valid: Boolean) => {
          console.log('submitForm', valid)
          if (!valid) return

          loading.value = true

          userstore.login(form).then(() => {
            loading.value = false
            router.push({ path: '/' })
          })
        })
      }
</script>
<template>
    <div
    class="login-wrap"
    :style="`background: url('${bgImg}') center center no-repeat`"
  >
    <div class="login-content">
      <div class="head">
        <p class="wc">Welcome</p>
        <p class="greet">欢迎来到平台管理中心</p>
      </div>
      <a-config-provider componentSize="large" :input="{size: 'large'}">
      <a-form
        class="login-form-wrap"
        :model="form"
        :rules="rules"
        ref="formVm"
      >
        <h1>登录页</h1>
        <a-form-item prop="username">
          <a-input placeholder="请输入用户名" v-model="form.username" size="large">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item prop="password">
          <a-input
            :type="passInputType"
            placeholder="请输入密码"
            size="large"
            v-model="form.password"
          >
            <template #prefix>
              <lock-outlined />
            </template>
            <template #suffix>
              <a-icon
                ><View
                  class="view-icon"
                  :class="{ 'is-active': passVisible }"
                  @click="passVisibleTaggleClick"
              /></a-icon>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item prop="code">
          <a-input
            size="large"
            placeholder="请输入验证码"
            autocomplete="off"
            v-model="form.code"
          >
            <template #prefix>
              <a-icon><folder-checked /></a-icon>
            </template>
          </a-input>
          <Identify class="identify"></Identify>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            :loading="loading"
            class="login-btn"
            @click="submitForm"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
      </a-config-provider>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .login-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-size: 100% auto;
  }
  .login-content {
    width: 406px;
    box-sizing: border-box;
    background-size: cover;
    position: absolute;
    right: 150px;
    top: 50%;
    background: #fff;
    transform: translateY(-50%);
    box-shadow: 0 0 6px #999;
    padding: 36px;
    .head {
      .wc {
        font-size: 30px;
        font-weight: 600;
        color: @primary-color;
        margin-bottom: 0;
      }
      .greet {
        margin-top: 6px;
        font-size: 16px;
        font-weight: 400;
        // color: var(--a-color-white);
        color: @primary-color;
      }
    }
  }
</style>

<style lang="less">
  // 充值表单样式
  .login-form-wrap {
    @height: 48px;
    position: relative;
    background-color:#fff;
    z-index: 111;
    h1 {
      font-size: 20px;
      font-weight: 500;
    }
    .ant-input-affix-wrapper-lg {
        padding-top: 11px;
        padding-bottom: 10.5px;
    }

    .ant-col {
      .a-input__inner {
        height: @height !important;
        line-height: @height !important;
        outline: none !important;
      }
      .a-input__suffix {
        right: 10px !important;
        align-items: center;
      }
      .a-icon {
        // font-size: 0;
        // position: relative;
        // top: -1px;
        svg {
          font-size: 18px;
        }
        .view-icon {
          cursor: pointer;
          &.is-active {
            color: @primary-color;
          }
        }
      }
    }

    .identify {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      height: 100%;
      z-index: 1;
    }

    .login-btn {
      width: 100%;
      display: block;
      min-height: @height !important;
      background-color: @primary-color;
      border-color: @primary-color;
    }
  }
</style>