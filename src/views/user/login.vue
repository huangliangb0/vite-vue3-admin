<script lang="ts" setup>
  // import { User, Lock, FolderChecked, View } from '@element-plus/icons'
  import {
    UserOutlined,
    LockOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    CodeOutlined,
  } from '@ant-design/icons-vue'
  import { computed, onMounted, reactive, ref, toRaw } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import useUserStore from '@/store/modules/user'
  import { getImageUrl } from '@/assets'
  import { useForm } from 'ant-design-vue/lib/form'
  import { getList } from '@/server/article'

  const route = useRoute()
  const userStore = useUserStore()
  const captchaPicture = getImageUrl('captcha.gif')
  const bgImg = getImageUrl('login-bg.png')

  const router = useRouter()
  const passVisible = ref(false)
  const loading = ref(false)
  const form = reactive({
    username: '',
    password: '',
    code: '',
  })
  const rules = reactive({
    username: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur',
      },
    ],
    code: [
      {
        required: true,
        message: '验证码不能为空',
        trigger: 'blur',
      },
    ],
  })
  const passInputType = computed(() =>
    passVisible.value ? 'text' : 'password',
  )

  // 密码查看切换
  const passVisibleToggleClick = () => {
    passVisible.value = !passVisible.value
  }

  const { validate } = useForm(form, rules, {
    onValidate: (...args) => console.log(...args),
  })

  const onSubmit = () => {
    validate()
      .then(() => {
        loading.value = true
        userStore.login(toRaw(form)).then(() => {
          loading.value = false
          const { redirect, ...query } = route.query
          router.push({ path: (redirect as string) || '/', query })
        })
      })
      .catch((err) => {
        console.log('error', err)
      })
  }
  onMounted(() => {
    getList()
  })
</script>
<template>
  <div
    class="login-wrap"
    :style="`background: url('${bgImg}') center center no-repeat`"
  >
    <div class="login-content">
      <div class="head">
        <p class="title"> 登录页 </p>
        <p class="greet"> 欢迎来到平台管理中心 </p>
      </div>
      <a-config-provider component-size="large" :input="{ size: 'large' }">
        <a-form
          ref="formRef"
          class="login-form-box"
          :model="form"
          :rules="rules"
        >
          <a-form-item name="username">
            <a-input
              v-model:value="form.username"
              placeholder="请输入用户名"
              size="large"
            >
              <template #prefix>
                <user-outlined />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password">
            <a-input
              v-model:value="form.password"
              :type="passInputType"
              placeholder="请输入密码"
              size="large"
            >
              <template #prefix>
                <lock-outlined />
              </template>
              <template #suffix>
                <eye-invisible-outlined
                  v-if="passVisible"
                  @click="passVisibleToggleClick"
                />
                <eye-outlined v-else @click="passVisibleToggleClick" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="code">
            <a-input
              v-model:value="form.code"
              size="large"
              placeholder="请输入验证码"
            >
              <template #prefix>
                <code-outlined />
              </template>
            </a-input>
            <div class="identify">
              <img :src="captchaPicture" alt="验证码" />
            </div>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              :loading="loading"
              @click.prevent="onSubmit"
            >
              登录
            </a-button>
          </a-form-item>
          <a-form-item>
            <p>账号密码随意</p>
            <p
              >登录之前启动一下json-server：<strong style="color: red"
                >pnpm json:server</strong
              ></p
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
      .title {
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
  .login-form-box {
    @height: 48px;
    position: relative;
    background-color: #fff;
    z-index: 111;
    .ant-input-affix-wrapper-lg {
      padding-top: 11px;
      padding-bottom: 10.5px;
    }
    .identify {
      position: absolute;
      right: 1px;
      top: 1px;
      bottom: 1px;
      z-index: 1;
      overflow: hidden;
      line-height: 46px;
      img {
        vertical-align: middle;
      }
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
