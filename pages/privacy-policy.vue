<template>
  <div>
    <div class="relative z-0 min-h-[450px] inline-block w-full">
      <div
        class="absolute z-20 flex w-full min-h-[600px] xl:min-h-full isolate"
      >
        <div
          class="static z-50 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-white pt-32"
        >
          <div class="grid place-content-center">
            <div class="space-y-8">
              <img
                src="/icon-shield.png"
                class="h-24 w-36 object-contain mx-auto"
                alt="hero"
              />
              <h1 class="font-bold text-4xl md:text-[50px] text-center">
                {{ $t("privacy_policy_title_txt") }}
              </h1>
              <div class="max-w-xl text-center">
                <p class="opacity-50 leading-5">
                  {{ $t("privacy_policy_sub_desc_txt") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="xl:opacity-100 -z-50 inset-0">
        <div class="relative">
          <div
            class="absolute w-full h-full bg-gradient-to-b from-black/80 from-60% to-black/50 z-10"
          ></div>
          <NuxtImg
            src="/privacy-hero.png"
            class="w-full h-full min-h-[600px] xl:min-h-full object-cover pointer-events-none isolate"
            alt="hero-background"
            loading="lazy"
            densities="x1 x2"
            format="webp"
          />
        </div>
      </div>
    </div>

    <ResizeContainer>
      <div class="prose w-full mx-auto">
        <p>
          At Bali Visum, accessible from
          https://staging-bali-visa-officials.spdigitalhosting.com/, one of our
          main priorities is the privacy of our visitors. This Privacy Policy
          document contains types of information that is collected and recorded
          by Bali Visum and how we use it.
        </p>

        <p>
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us.
        </p>

        <h2>Log Files</h2>

        <p>
          Bali Visum follows a standard procedure of using log files. These
          files log visitors when they visit websites. All hosting companies do
          this and a part of hosting services' analytics. The information
          collected by log files include internet protocol (IP) addresses,
          browser type, Internet Service Provider (ISP), date and time stamp,
          referring/exit pages, and possibly the number of clicks. These are not
          linked to any information that is personally identifiable. The purpose
          of the information is for analyzing trends, administering the site,
          tracking users' movement on the website, and gathering demographic
          information.
        </p>

        <h2>Cookies and Web Beacons</h2>

        <p>
          Like any other website, Bali Visum uses "cookies". These cookies are
          used to store information including visitors' preferences, and the
          pages on the website that the visitor accessed or visited. The
          information is used to optimize the users' experience by customizing
          our web page content based on visitors' browser type and/or other
          information.
        </p>

        <h2>Google DoubleClick DART Cookie</h2>

        <p>
          Google is one of a third-party vendor on our site. It also uses
          cookies, known as DART cookies, to serve ads to our site visitors
          based upon their visit to www.website.com and other sites on the
          internet. However, visitors may choose to decline the use of DART
          cookies by visiting the Google ad and content network Privacy Policy
          at the following URL –
          <a href="https://policies.google.com/technologies/ads"
            >https://policies.google.com/technologies/ads</a
          >
        </p>

        <h2>Our Advertising Partners</h2>

        <p>
          Some of advertisers on our site may use cookies and web beacons. Our
          advertising partners are listed below. Each of our advertising
          partners has their own Privacy Policy for their policies on user data.
          For easier access, we hyperlinked to their Privacy Policies below.
        </p>

        <ul>
          <li>
            <p>Google</p>
            <p>
              <a href="https://policies.google.com/technologies/ads"
                >https://policies.google.com/technologies/ads</a
              >
            </p>
          </li>
        </ul>

        <h2>Privacy Policies</h2>

        <P
          >You may consult this list to find the Privacy Policy for each of the
          advertising partners of Bali Visum.</P
        >

        <p>
          Third-party ad servers or ad networks uses technologies like cookies,
          JavaScript, or Web Beacons that are used in their respective
          advertisements and links that appear on Bali Visum, which are sent
          directly to users' browser. They automatically receive your IP address
          when this occurs. These technologies are used to measure the
          effectiveness of their advertising campaigns and/or to personalize the
          advertising content that you see on websites that you visit.
        </p>

        <p>
          Note that Bali Visum has no access to or control over these cookies
          that are used by third-party advertisers.
        </p>

        <h2>Third Party Privacy Policies</h2>

        <p>
          Bali Visum's Privacy Policy does not apply to other advertisers or
          websites. Thus, we are advising you to consult the respective Privacy
          Policies of these third-party ad servers for more detailed
          information. It may include their practices and instructions about how
          to opt-out of certain options.
        </p>

        <p>
          You can choose to disable cookies through your individual browser
          options. To know more detailed information about cookie management
          with specific web browsers, it can be found at the browsers'
          respective websites. What Are Cookies?
        </p>

        <h2>Children's Information</h2>

        <p>
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.
        </p>

        <p>
          Bali Visum does not knowingly collect any Personal Identifiable
          Information from children under the age of 13. If you think that your
          child provided this kind of information on our website, we strongly
          encourage you to contact us immediately and we will do our best
          efforts to promptly remove such information from our records.
        </p>

        <h2>Online Privacy Policy Only</h2>

        <p>
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in Bali Visum. This policy is not applicable to
          any information collected offline or via channels other than this
          website.
        </p>

        <h2>Consent</h2>

        <p>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its Terms and Conditions.
        </p>
      </div>
    </ResizeContainer>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Privacy Policy",
});
</script>

<style></style>
