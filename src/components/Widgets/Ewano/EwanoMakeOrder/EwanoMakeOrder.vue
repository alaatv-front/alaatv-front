<script>
export default {
  name: 'RaychatWidget',
  data () {
    return {

    }
  },
  mounted () {
    this.$bus.on('busEvent-refreshCart', this.cartReview)
  },
  methods: {
  }
}
</script>
