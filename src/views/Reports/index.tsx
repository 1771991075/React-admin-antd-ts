import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { getDataReports } from '../../api/options';
import option from './option';
export default function Reports() {
  let boxRef: { current: any } = useRef()

  let getData = async () => {
    let res = await getDataReports()
    option.xAxis = res.data.data.xAxis
    option.yAxis = res.data.data.yAxis
    option.legend = res.data.data.legend
    option.series = res.data.data.series
    //初始化echarts
    let boxEcharts = echarts.init(boxRef.current)
    //配置echarts
    boxEcharts.setOption(option)
    //echarts适配
    window.onresize = () => {
      boxEcharts.resize()
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <div ref={boxRef} style={{ width: '100%', height: '500px' }}>

      </div>
    </div>
  )
}
