<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    "
  >
    <FlipBook :width="496" :height="700" rounded>
      <FlipbookSheet>
        <template #front>
          <img
            src="https://i.pinimg.com/originals/09/54/48/095448ca9c4198fe2bc9ced7f031fad5.jpg"
            alt=""
            srcset=""
            style="width: 100%; height: 100%"
          />
        </template>
        <template #back>
          <div style="width: 100%; height: 100%; background: orange"></div>
        </template>
      </FlipbookSheet>

      <FlipbookSheet v-for="x in 10" :key="x">
        <template #front="{ number }">
          <div style="padding: 24px">
            ipsum dolor sit amet consectetur adipisicing elit. Molestias, exercitationem, voluptas iure quae, odio
            quaerat rem molestiae dolores itaque magnam modi fugit ratione? Similique quibusdam odio repudiandae fugit
            minus modi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, vero aspernatur voluptatum
            porro necessitatibus aliquam facilis.
          </div>
        </template>
        <template #back="{ number }">
          <div style="padding: 24px">
            Test page {{ number }} Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ad consequatur
            accusantium porro eaque commodi perspiciatis. Excepturi enim possimus aliquid amet, culpa adipisicing elit.
            Placeat deleniti numquam aut similique, rerum dolor quas debitis error laudantium ab excepturi? Tempore enim
            accusamus molestias delectus sunt pariatur inventore dolorum? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Enim distinctio sapiente sint nihil deleniti accusantium iusto recusandae, explicabo modi
            possimus illo officia numquam soluta voluptatem, sunt ipsam quis, porro architecto! Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Pariatur libero ipsa quod quibusdam tempora. Cum ducimus ab id ipsum
            sint tempore, incidunt, dolorem excepturi exercitationem vel totam pariatur sit expedita? Lorem ipsum dolor
            sit amet, consectetur adipisicing elit.
            <span style="background-color: green">
              Expedita maxime iste optio animi saepe id, alias magni omnis, esse quae, non molestiae aspernatur eveniet
              sed reprehenderit at! Culpa, atque autem?</span
            >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, exercitationem, voluptas iure quae, odio
            quaerat rem molestiae dolores itaque magnam modi fugit ratione?
            <span style="background-color: blue"
              >Similique quibusdam odio repudiandae fugit minus modi? Lorem ipsum dolor sit amet consectetur adipisicing
              elit.</span
            >
            <span style="background-color: yellow">
              Repellat, vero aspernatur voluptatum porro necessitatibus aliquam facilis.
            </span>
          </div>
        </template>
      </FlipbookSheet>

      <FlipbookSheet>
        <template #front="{ number }">
          <div style="width: 100%; height: 100%; background: purple">Test page {{ number }}</div>
        </template>
        <template #back="{ number }">
          <div style="width: 100%; height: 100%; background: purple">Test page {{ number }}</div>
        </template>
      </FlipbookSheet>
    </FlipBook>
  </div>
</template>

<script setup lang="ts">
import FlipBook from "./components/FlipBook/FlipBook.vue";
import FlipbookSheet from "./components/FlipBook/FlipbookSheet.vue";
</script>
<style>
body {
  overflow: hidden;
  background: rgb(77, 77, 77);
  margin: 0;
}
</style>
