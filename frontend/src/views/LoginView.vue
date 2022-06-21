<template>
  <base-auth>
    <template #form>
      <div class="flex flex-col">
        <span class="text-xl font-bold text-gray-600"> Hoş Geldiniz </span>
        <small class="text-gray-400"
          >Giriş yapmak için bilgilerinizi doldurunuz.</small
        >
      </div>
      <div class="flex flex-col mt-4 w-full gap-3">
        <BaseInput
          :errors="emailErrors"
          label="E-posta"
          v-model="loginModel.email"
        />
        <BaseInput
          :errors="passwordErrors"
          type="password"
          label="Şifre"
          v-model="loginModel.password"
        />
        <BaseButton
          class="mt-4"
          :loading="loading"
          @click="login"
          :disabled="!loginModel.email || !loginModel.password"
        >
          Giriş Yap
        </BaseButton>
      </div>
      <div class="flex w-full justify-center mt-8">
        <small class="text-center">
          Hesabın yok mu?
          <router-link
            to="/register"
            class="font-bold hover:underline text-secondary-500"
          >
            Kayıt Ol</router-link
          >
        </small>
      </div></template
    >
  </base-auth>
</template>

<script setup>
import BaseInput from "../components/Common/BaseInput.vue";
import BaseButton from "../components/Common/BaseButton.vue";

import { watch, ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import BaseAuth from "../components/Auth/BaseAuth.vue";

const userStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const loginModel = ref({
  email: "",
  password: "",
});
const emailErrors = ref([]);
const passwordErrors = ref([]);

const loading = ref(false);

const validateEmail = (email) => {
  return email.match(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validatePassword = (password) => {
  if (password.length < 8) {
    passwordErrors.value.push("Şifreniz en az 8 karakter olmalıdır.");
  }
  if (password.match(/[a-z]/i) < 0) {
    passwordErrors.value.push("Şifreniz en az bir harf içermelidir.");
  }
  if (password.match(/[0-9]/) < 0) {
    passwordErrors.value.push("Şifreniz en az bir rakam içermelidir.");
  }
  return passwordErrors.value.length === 0;
};

watch(
  () => loginModel.value.email,
  (email) => {
    if (!validateEmail(email) && email.includes("@")) {
      emailErrors.value = ["Geçersiz bir e-posta girdiniz."];
    } else {
      emailErrors.value = [];
    }
  }
);

const login = async () => {
  if (!validateEmail(loginModel.value.email)) {
    emailErrors.value = ["Geçersiz bir e-posta girdiniz."];
    return;
  }
  if (!validatePassword(loginModel.value.password)) {
    return;
  }
  emailErrors.value = [];
  passwordErrors.value = [];
  loading.value = true;
  const result = await userStore.login(loginModel.value);
  if (result) {
    router.push("/");
  } else {
    toast.error("Giriş başarısız.");
  }

  loading.value = false;
};
</script>

<style></style>
