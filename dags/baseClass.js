const BUS=gitgraph.branch("BUS");
BUS.commit({ subject: "Init", author: "CTRL" });
const CPU=gitgraph.branch("GOOD");
CPU.commit({subject: "Boot", author: "Boot"});
const GPU=gitgraph.branch("GPU");
GPU.commit({subject: "Test",author: "GG"});

