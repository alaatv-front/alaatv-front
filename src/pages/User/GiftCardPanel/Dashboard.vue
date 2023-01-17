<template>
  <div>Dashboard</div>
</template>

<script>
export default {
  name: 'user-consulting',
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
