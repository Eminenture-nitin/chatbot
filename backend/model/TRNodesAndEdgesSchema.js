const mongoose = require("mongoose");

const tRNodesSchema = mongoose.Schema({
  id: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  connections: { type: Object },
  data: {
    triggerType: { type: String, required: true },
    iconName: { type: Object },
    trigger_Name: { type: String, required: true },
    nodeHandles: { type: Number, required: true },
    decisiontrigger: { type: Boolean, default: false },
  },
  type: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  selected: { type: Boolean },
  dragging: { type: Boolean },
});

const tREdgesSchema = mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  sourceHandle: {
    type: String,
    default: null,
  },
  target: {
    type: String,
    required: true,
  },
  targetHandle: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  label: {
    type: String,
    default: "",
  },
});

const tRNodesAndEdgesSchema = mongoose.Schema(
  {
    adminId: { type: String, required: true },
    tRNodes: [tRNodesSchema],
    tREdges: [tREdgesSchema],
  },
  { timestamps: true }
);

const TRNodesAndEdgeModel = mongoose.model(
  "TRNodesAndEdge",
  tRNodesAndEdgesSchema
);

module.exports = TRNodesAndEdgeModel;
