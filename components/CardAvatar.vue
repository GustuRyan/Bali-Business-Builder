<script lang="ts" setup>
import { FormUser } from "@/types";
const { $user, $isLogin } = useAuth();

const { locale } = useI18n();

const loading = ref<boolean>(false);

const modal = ref<boolean>(false);

const props = defineProps<{ person: Partial<FormUser> }>();
const imageUrl = computed(() => {
  return props.person.selfie_image as string;
});

const emit = defineEmits(["reload", "edit"]);

import { useFormStore } from "@/stores/form";
const store = useFormStore();

function removePerson() {
  store.removeFormPerson(props.person.id as number);
}

async function removePersonFromAPI() {
  loading.value = true;
  const { data } = await useCustomFetch(
    `/users/${$user.value?.uuid}/person-forms/${props.person.id}?lang=${locale.value}`,
    {
      method: "DELETE",
    }
  );

  if (data.value) {
    emit("reload", true);
  }
  loading.value = false;
}

function removePersonCheckbox() {
  removePerson();
}

function editItem() {
  emit("edit", props.person);
  removePerson();
}

function toggleModal() {
  modal.value = !modal.value;
}
</script>
<template>
  <div class="card rounded-xl border-2">
    <div class="card-body p-4">
      <div class="relative">
        <div class="absolute w-full z-10 grid place-content-end">
          <div class="flex flex-row space-x-2">
            <div>
              <button
                type="button"
                class="btn btn-square rounded-full btn-sm ml-auto"
                @click="editItem"
              >
                <Icon name="i-heroicons-pencil" class="h-5 w-5" />
              </button>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-error btn-square rounded-full btn-sm ml-auto"
                @click="removePersonCheckbox"
              >
                <Icon name="i-heroicons-trash" class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div
          class="w-full h-full flex flex-col space-y-1 justify-center items-center"
          @click="toggleModal"
        >
          <div class="avatar">
            <div class="h-36 rounded-full">
              <img
                :src="imageUrl"
                v-if="imageUrl"
                class="object-cover h-full w-full"
                alt="avatar"
              />
              <div v-else class="h-full w-full bg-gray-500"></div>
            </div>
          </div>
          <div class="font-semibold">{{ props.person.name }}</div>
          <div>{{ props.person?.passport_no ?? "xxxxxx" }}</div>
        </div>
      </div>
      <ModalPerson v-model="modal" :person="person" />
    </div>
  </div>
</template>

<style></style>
