<template>
    <div>
        sdjflksdj
        <isv-comp />
    </div>
</template>
<script>
export default {
    data() {
        return {
            msg: ''
        }
    },
    components: {
        'isv-comp': (resolve) => {
            if (window.mallCloud) {
                resolve(window.mallCloud.components.goodsDetail__v2shuai);
            } else {
                resolve({
                    render: h => h('div')
                })
            }
        }
    }
}
</script>