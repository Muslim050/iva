import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearStatistics,
  fetchChannelStatistics,
  fetchVideoStatistics,
} from "../../../redux/statisticsSlice";
import StatictickChannel from "./StatictickChannel/StatictickChannel";
import StatictickVideoTable from "./StatictickVideo/StatictickVideoTable";

function ChannelStatisticsPage() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const data = useSelector((state) => state.statistics.statisticsVideo);
  const dataChannel = useSelector(
    (state) => state.statistics.statisticsChannel
  );
  const [loading, setLoading] = React.useState(true);
  const [channel, setLoadingChannel] = React.useState(true);
  React.useEffect(() => {
    dispatch(clearStatistics());
    dispatch(fetchVideoStatistics({ id })).then(() => setLoading(false));
    dispatch(fetchChannelStatistics({ id })).then(() =>
      setLoadingChannel(false)
    );
  }, [dispatch]);

  return (
    <>
      <StatictickChannel dataChannel={dataChannel} channel={channel} />

      <StatictickVideoTable data={data} loading={loading} />
    </>
  );
}

export default ChannelStatisticsPage;
