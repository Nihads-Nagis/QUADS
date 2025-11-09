const BUS=gitgraph.branch("BUS");
BUS.commit({ subject: "Init", author: "CTRL" });
const CPU=gitgraph.branch("CPU");
CPU.commit({subject: "Boot", author: "Boot"});
