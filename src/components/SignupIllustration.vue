<script setup lang="ts">
const props = defineProps({
  organizationName: {
    type: String
  },
  logoPreviewUrl: {
    type: String
  }
});
</script>

<template>
  <svg
    class="magma-signup-template"
    viewBox="0 0 600 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 16C0 7.16344 7.16344 0 16 0H584C592.837 0 600 7.16344 600 16V264C600 272.837 592.837 280 584 280H16C7.16343 280 0 272.837 0 264V16Z"
      fill="#F1F5F9"
    />
    <g clip-path="url(#clip0_1_1322)">
      <mask id="path-2-inside-1_1_1322" fill="white">
        <path d="M140 48C140 43.5817 143.582 40 148 40H600V280H140V48Z" />
      </mask>

      <path
        d="M140 48C140 43.5817 143.582 40 148 40H600V280H140V48Z"
        fill="white"
      />

      <rect
        width="256"
        height="960"
        transform="translate(140 40)"
        fill="#0E1014"
      />
      <g clip-path="url(#clip1_1_1322)">
        <path
          d="M173.333 165.333L180 168.667L186.667 165.333M173.333 162L180 165.333L186.667 162M180 155.333L173.333 158.667L180 162L186.667 158.667L180 155.333Z"
          stroke="#CBD5E1"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <path
        opacity="0.5"
        d="M196 158C196 155.791 197.791 154 200 154H268C270.209 154 272 155.791 272 158V166C272 168.209 270.209 170 268 170H200C197.791 170 196 168.209 196 166V158Z"
        fill="#F1F5F9"
      />
      <defs>
        <clipPath id="circleView">
          <circle cx="16" cy="16" r="16" fill="white" />
        </clipPath>
      </defs>
      <image
        width="32"
        height="32"
        transform="translate(165 80)"
        :xlink:href="props.logoPreviewUrl"
        clip-path="url(#circleView)"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMinYMin slice"
      />

      <circle
        cx="16"
        cy="16"
        r="16"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1"
        transform="translate(165 80)"
      ></circle>

      <text x="210" y="100" class="magma-signup-illustration-organization-name">
        {{ props.organizationName }}
      </text>
      <path
        d="M180 195.333L182.06 199.507L186.667 200.18L183.333 203.427L184.12 208.013L180 205.847L175.88 208.013L176.667 203.427L173.333 200.18L177.94 199.507L180 195.333Z"
        stroke="#CBD5E1"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        opacity="0.5"
        d="M196 198C196 195.791 197.791 194 200 194H267C269.209 194 271 195.791 271 198V206C271 208.209 269.209 210 267 210H200C197.791 210 196 208.209 196 206V198Z"
        fill="#F1F5F9"
      />
      <rect
        x="179.25"
        y="224.25"
        width="0.5"
        height="67.5"
        stroke="#5F6C85"
        stroke-width="0.5"
      />
      <path
        opacity="0.5"
        d="M212 236C212 233.791 213.791 232 216 232H259C261.209 232 263 233.791 263 236V244C263 246.209 261.209 248 259 248H216C213.791 248 212 246.209 212 244V236Z"
        fill="#F1F5F9"
      />
      <path
        opacity="0.5"
        d="M212 272C212 269.791 213.791 268 216 268H248C250.209 268 252 269.791 252 272V280C252 282.209 250.209 284 248 284H216C213.791 284 212 282.209 212 280V272Z"
        fill="#F1F5F9"
      />
      <rect
        width="1184"
        height="326"
        transform="translate(396 40)"
        fill="white"
      />
      <rect
        width="1184"
        height="125"
        transform="translate(396 40)"
        fill="white"
      />
      <path
        d="M428 76C428 73.7909 429.791 72 432 72H656C658.209 72 660 73.7909 660 76V88C660 90.2091 658.209 92 656 92H432C429.791 92 428 90.2091 428 88V76Z"
        fill="#F1F5F9"
      />
      <path
        d="M428 112C428 109.791 429.791 108 432 108H753C755.209 108 757 109.791 757 112V136C757 138.209 755.209 140 753 140H432C429.791 140 428 138.209 428 136V112Z"
        fill="#F1F5F9"
      />
      <rect
        x="396.25"
        y="164.25"
        width="1183.5"
        height="0.5"
        stroke="#E2E8F0"
        stroke-width="0.5"
      />
      <g filter="url(#filter0_d_1_1322)">
        <rect
          x="428"
          y="197"
          width="1120"
          height="121"
          rx="8"
          fill="#F1F5F9"
          shape-rendering="crispEdges"
        />
        <rect
          x="428.5"
          y="197.5"
          width="1119"
          height="120"
          rx="7.5"
          stroke="#E2E8F0"
          shape-rendering="crispEdges"
        />
      </g>
    </g>
    <path
      d="M139 48C139 43.0294 143.029 39 148 39H600V41H148C144.134 41 141 44.134 141 48H139ZM600 280H140H600ZM139 280V48C139 43.0294 143.029 39 148 39V41C144.134 41 141 44.134 141 48V280H139ZM600 40V280V40Z"
      fill="#E2E8F0"
      mask="url(#path-2-inside-1_1_1322)"
    />
    <defs>
      <filter
        id="filter0_d_1_1322"
        x="426"
        y="196"
        width="1124"
        height="125"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.109804 0 0 0 0 0.121569 0 0 0 0 0.152941 0 0 0 0.05 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1_1322"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1_1322"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_1_1322">
        <path
          d="M140 48C140 43.5817 143.582 40 148 40H600V280H140V48Z"
          fill="white"
        />
      </clipPath>
      <clipPath id="clip1_1_1322">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(172 154)"
        />
      </clipPath>
    </defs>
  </svg>
</template>

<style scoped>
.magma-signup-illustration-organization-name {
  @apply text-mgm-txt-sm font-sans;
  fill: #ffffff;
}
</style>
