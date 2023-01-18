<template>
  <div>Dashboard</div>
</template>

<script>
export default {
  name: 'Dashboard',
  data: () => ({
    pageConfig: {},
    sections: [
      {
        data: {
          rows: [
            {
              cols: [
                {
                  widgets: [
                    {
                      name: 'AbrishamConsulting'
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    ]
  })
}
</script>
