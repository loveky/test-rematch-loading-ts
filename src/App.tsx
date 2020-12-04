import React from "react";
import { connect } from "react-redux";
import Spinner from "react-spinkit";
import { RootState, Dispatch } from "./store";

const styles = {
  page: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  container: {
    border: "1px solid black",
    backgroundColor: "lightYellow",
    padding: "1rem",
    width: "15rem",
    height: "18rem",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  loading: {
    height: "5rem",
  },
} as const;

const Loading: React.FC<{ label: string; show: boolean }> = ({
  label,
  show,
}) => (
  <div style={styles.loading}>
    <p>
      {label} = <strong>{show.toString()}</strong>
    </p>
    {show && <Spinner name="line-scale" color="black" />}
  </div>
);

const App: React.FC<{
  incrementAsync: () => Promise<void>;
  incrementAsync2: () => Promise<void>;
  loading: {
    global: boolean;
    model: boolean;
    effectIncrementAsync: boolean;
    effectIncrementAsync2: boolean;
  };
}> = ({ incrementAsync, incrementAsync2, loading }) => (
  <div style={styles.page}>
    <button onClick={incrementAsync}>incrementAsync Async</button>
    <button onClick={incrementAsync2}>incrementAsync2 Async</button>
    <div style={styles.container}>
      <Loading label="loading.global" show={loading.global} />
      <Loading label="loading.models.form" show={loading.model} />
      <Loading
        label="loading.effects.form.incrementAsync"
        show={loading.effectIncrementAsync}
      />
      <Loading
        label="loading.effects.form.incrementAsync2"
        show={loading.effectIncrementAsync2}
      />
    </div>
  </div>
);

const mapState = (state: RootState) => ({
  count: state.count,
  loading: {
    global: state.loading.global,
    model: state.loading.models.count,
    effectIncrementAsync: state.loading.effects.count.incrementAsync,
    effectIncrementAsync2: state.loading.effects.count.incrementAsync2,
  },
});

const mapDispatch = (dispatch: Dispatch) => ({
  incrementAsync: dispatch.count.incrementAsync,
  incrementAsync2: dispatch.count.incrementAsync2,
});

export default connect(mapState, mapDispatch)(App);
