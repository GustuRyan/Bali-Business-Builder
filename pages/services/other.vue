<template>
    <div class="relative z-0 min-h-[450px] inline-block w-full">
        <div class="absolute z-20 flex w-full min-h-[600px] xl:min-h-full isolate">
            <div class="static z-50 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-white pt-32">
                <div class="grid place-content-center">
                    <div class="space-y-8">
                        <img src="/icon-checklist-paper.png" class="h-24 w-36 object-contain mx-auto" alt="hero" />
                        <h1 class="font-bold text-4xl md:text-[50px] text-center">
                            {{ $t("establishment_pt_pma") }}
                        </h1>
                        <div class="max-w-5xl text-center">
                            <p class="opacity-50 leading-5">
                                {{ $t("establishment_description") }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="xl:opacity-100 -z-50 inset-0">
            <div class="relative">
                <div class="absolute w-full h-full bg-gradient-to-b from-black/80 from-60% to-black/50 z-10"></div>
                <NuxtImg src="/faq-hero.png"
                    class="w-full h-full min-h-[600px] xl:min-h-full object-cover pointer-events-none isolate"
                    alt="hero-background" loading="lazy" densities="x1 x2" format="webp" />
            </div>
        </div>
    </div>
    <ResizeContainer>
        <div class="px-0 lg:px-36 space-y-8">
            <div class="space-y-2 w-full leading-loose">
                <div class="collapse collapse-plus">
                    <input type="radio" name="my-accordion-2" class="peer" checked />
                    <div class="collapse-title font-bold peer-checked:bg-base-200 transition-colors duration-300">
                        {{ $t("pt_pma_get_title") }}
                    </div>
                    <div class="collapse-content peer-checked:bg-base-200 transition-colors duration-300">
                        <div>
                            <ol class="list-decimal list-inside">
                                <li>{{ $t("pt_pma_get_li_1") }}</li>
                                <li>
                                    {{ $t("pt_pma_get_li_2") }}
                                </li>
                                <li>
                                    {{ $t("pt_pma_get_li_3") }}
                                </li>
                                <li>
                                    {{ $t("pt_pma_get_li_4") }}
                                </li>
                                <li>
                                    {{ $t("pt_pma_get_li_5") }}
                                </li>
                                <li>
                                    {{ $t("pt_pma_get_li_6") }}
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div class="collapse collapse-plus">
                    <input type="radio" name="my-accordion-2" class="peer" checked />
                    <div class="collapse-title font-bold peer-checked:bg-base-200 transition-colors duration-300">
                        {{ $t("pt_pma_required_title") }}
                    </div>
                    <div class="collapse-content peer-checked:bg-base-200 transition-colors duration-300">
                        <div>
                            <ol class="list-decimal list-inside">
                                <li>{{ $t("pt_pma_required_li_1") }}</li>
                                <li>
                                    {{ $t("pt_pma_required_li_2") }}
                                </li>
                                <li>
                                    {{ $t("pt_pma_required_li_3") }}
                                </li>
                                <li>
                                    {{ $t("pt_pma_required_li_4") }}
                                </li>
                                <li>
                                    {{ $t("pt_pma_required_li_5") }}
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div class="collapse collapse-plus">
                    <input type="radio" name="my-accordion-2" class="peer" checked />
                    <div class="collapse-title font-bold peer-checked:bg-base-200 transition-colors duration-300">
                        {{ $t("pt_pma_processing_title") }}
                    </div>
                    <div class="collapse-content peer-checked:bg-base-200 transition-colors duration-300">
                        <div>
                            <ol class="list-decimal list-inside">
                                <li>{{ $t("pt_pma_processing_li_1") }}</li>
                                <li>
                                    {{ $t("pt_pma_processing_li_2") }}
                                </li>
                                <li>
                                    {{ $t("pt_pma_processing_li_3") }}
                                </li>
                                <li>
                                    {{ $t("pt_pma_processing_li_4") }}
                                </li>
                                <li>
                                    {{ $t("pt_pma_processing_li_5") }}
                                </li>
                                <li>
                                    {{ $t("pt_pma_processing_li_6") }}
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <p class="w-full px-4">
                    <b>{{ $t("note") }}</b>
                    {{ $t("pt_pma_note") }}
                </p>
            </div>
        </div>
    </ResizeContainer>
</template>

<script lang="ts">

</script>