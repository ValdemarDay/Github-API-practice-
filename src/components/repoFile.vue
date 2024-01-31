<script>
import { mapState } from "vuex";
import { Buffer } from 'buffer';
export default {
    computed: {
        ...mapState(["currentContent"]),
        convertedFileFromBase64() {
            try {
                return Buffer.from(this.currentContent.content, "base64").toString(
                    "binary"
                );
            } catch (ex) {
                return "Cannot load file...";
            }
        },
    },
};
</script>

<template>
    <div>
        <pre>
      <code>
        {{ convertedFileFromBase64 }}
    </code>
    </pre>
    </div>
</template>

<style></style>
